import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { accessSecretKey, refreshSecretKey } from 'src/utilities/constants';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {
  constructor(private readonly prisma: DatabaseService, private jwtService: JwtService) {}
  private readonly salt = "ksadui73dksia8"

  async hashPassword(password: string) {
    const rounds = 10;
    return await bcrypt.hash(password + this.salt, rounds);
  };

  async checkPassword(inputPassword: string, storedPassword: string) {
    return await bcrypt.compare(inputPassword + this.salt, storedPassword);
  };

  async checkUUID(username, uuid) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        username
      }
    })

    if (foundUser.refreshToken == uuid) return true;
    return false;
  }

  async signAccessToken(username, role) {
    return this.jwtService.signAsync({username, role}, {
      secret: accessSecretKey,
      expiresIn: "1d"
    });
  };

  async signRefreshToken(username, uuid, role) {
    return this.jwtService.signAsync({username, uuid, role}, {
      secret: refreshSecretKey,
      expiresIn: "7d"
    });
  };

  async saveRefreshUUID(username: string, randomUUID: string) {
    await this.prisma.user.update({
      where: {
        username
      },
      data: {
        refreshToken: randomUUID
      }
    })
  }


  async registerUser(body: RegisterDto) {
    const {email, password, username} = body;

    const foundUsername = await this.prisma.user.findUnique({
      where: {
        username
      }
    });

    if (foundUsername) {
      throw new BadRequestException("username already exists");
    } 
    
    const foundEmail = await this.prisma.user.findUnique({
      where: {
        email
      }
    });
    
    if (foundEmail) {
      throw new BadRequestException("email already exists");
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
        accounts: {
          create: {}
        }
      }
    });

    return {"message": "User Registered Successfully"};
  };


  async loginUser(body: LoginDto, req: Request, res: Response) {
    const {username, password} = body;

    const foundUser = await this.prisma.user.findUnique({
      where: {
        username
      }
    });

    if (foundUser) {
      if (await this.checkPassword(password, foundUser.password)) {
        const { username, acccountType } = foundUser;

        const accessToken = await this.signAccessToken(username, acccountType);
        const randomUUID = uuidv4();
        const refreshToken = await this.signRefreshToken(username, randomUUID, acccountType);
        await this.saveRefreshUUID(username, randomUUID);

        res.cookie("refresh-token", refreshToken, {
          httpOnly: true,
          secure: true
        })

        return res.send({accessToken});
      }
    }

    throw new UnauthorizedException("Incorrect Username or Password");
  };


  // could add 2 different guards here
  async logoutUser(req: Request, res: Response) {
    const username = req.user["username"];

    await this.saveRefreshUUID(username, null);
    res.clearCookie("refresh-token");

    return res.send({"message": "User Logged Out Successfully"});
  };
  

  async refreshUser(req: Request, res: Response) {
    const username = req.user["username"];
    const userUUID = req.user["uuid"];
    const userRole = req.user["role"];

    const checkUUID = await this.checkUUID(username, userUUID);

    if (checkUUID) {
      const accessToken = await this.signAccessToken(username, userRole);
      return res.send({accessToken});
    }

    return res.send({"message": "Invalid Refresh Token"});
  };
};
