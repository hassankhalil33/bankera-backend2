import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {}

  async createUser(data) {
    this.prisma.user.create({
      data
    })

    return {"message": "user created successfully"}
  }

  async getUsers() {
    return this.prisma.user.findMany()
  }

  async getUser(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username
      }
    })
  }

  async updateUser(username: string, data) {
    this.prisma.user.update({
      data,
      where: {
        username
      }
    })

    return {"message": "user updated successfully"}
  }

  async deleteUser(username: string) {
    this.prisma.user.delete({
      where: {
        username
      }
    })

    return {"message": "user deleted successfully"}
  }
}
