import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtSecretKey } from 'src/utilities/constants';
import { Request, Response } from 'express';


@Injectable()
export class AuthService {
  constructor(private readonly prisma: DatabaseService, private jwtService: JwtService) {}
  private readonly salt = "ksadui73dksia8"

  async hashPassword(password: string) {
    const rounds = 15;
    return await bcrypt.hash(password + this.salt, rounds);
  };

  async checkPassword(inputPassword: string, storedPassword: string) {
    return await bcrypt.compare(inputPassword + this.salt, storedPassword);
  };

  async signUser(username, role) {
    return this.jwtService.signAsync({username, role}, {secret: jwtSecretKey});
  };

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
        const token = await this.signUser(foundUser.username, foundUser.acccountType);

        res.cookie("jwt-token", token, {
          httpOnly: true
        })

        return res.send({"message": "User Logged In Successfully"});
      }
    }

    throw new UnauthorizedException("Incorrect Username or Password");
  };

  async logoutUser(req: Request, res: Response) {
    res.clearCookie("jwt-token");

    return res.send({"message": "User Logged Out Successfully"});
  };
};
