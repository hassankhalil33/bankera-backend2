import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: DatabaseService) {}
  private readonly salt = "ksadui73dksia8"

  async hashPassword(password: string) {
    const rounds = 15;
    return await bcrypt.hash(password + this.salt, rounds);
  };

  async checkPassword(inputPassword: string, storedPassword: string) {
    return await bcrypt.compare(inputPassword + this.salt, storedPassword);
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

    const newUser = await this.prisma.user.create({
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

  async loginUser(body: LoginDto) {
    const {username, password} = body;

    const foundUser = await this.prisma.user.findUnique({
      where: {
        username
      }
    });

    if (foundUser) {
      if (await this.checkPassword(password, foundUser.password)) {
        return {"jwt": ""};
      }
    }

    return {"message": "Incorrect Username or Password"};
  };

  async logoutUser() {
    return {"message": "User Loggedout Successfully"};
  };
};
