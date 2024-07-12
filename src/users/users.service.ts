import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './dtos/updateuser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {}

  async getUsers(res: Response) {
    const allUsers = await this.prisma.user.findMany();
    const filteredUsers = await allUsers.filter(user => {
      const { password, refreshToken, ...filteredUser } = user;
      return filteredUser;
    })

    return res.send(filteredUsers);
  }

  async getUser(res: Response, username: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        username
      },
      include: {
        accounts: true
      }
    })

    const { password, refreshToken, dateUpdated, ...filteredUser } = foundUser;
    return res.send(filteredUser);
  }

  async updateUser(username: string, data: UpdateUserDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        username: data.username
      }
    })

    if (foundUser) {
      throw new BadRequestException("Username Already Exists");
    }

    await this.prisma.user.update({
      data,
      where: {
        username
      }
    })

    return {"message": "User Updated Successfully"}
  }

  async deleteAllUsers() {
    await this.prisma.user.deleteMany();

    return {"message": "All Users Deleted"}
  }

  async deleteUser(username: string) {
    await this.prisma.user.delete({
      where: {
        username
      }
    })

    return {"message": "User Deleted Successfully"}
  }
}
