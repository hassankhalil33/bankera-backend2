import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {}

  async createUser(body: {username: string, password: string, email: string}) {
    await this.prisma.user.create({
      data: {
        ...body,
        accounts: {
          create: {}
        }
      }
    })

    return { "message": "user created successfully"}
  }

  async getUsers() {
    return this.prisma.user.findMany()
  }

  async getUser(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username
      },
      include: {
        accounts: true
      }
    })
  }

  async updateUser(username: string, data) {
    await this.prisma.user.update({
      data,
      where: {
        username
      }
    })

    return {"message": "user updated successfully"}
  }

  async deleteAllUsers() {
    await this.prisma.user.deleteMany();

    return {"message": "all users deleted"}
  }

  async deleteUser(username: string) {
    await this.prisma.user.delete({
      where: {
        username
      }
    })

    return {"message": "user deleted successfully"}
  }
}
