import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: DatabaseService) {}

  async hashPassword(password: string) {
    const rounds = 15;
    const salt = "ksadui73dksia8"
    return await bcrypt.hash(password + salt, rounds);
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

    return {"message": "User Registered Successfully", newUser};
  };

  async loginUser(body) {
    return {"message": "User Loggedin Successfully", body};
  };

  async logoutUser() {
    return {"message": "User Loggedout Successfully"};
  };
};
