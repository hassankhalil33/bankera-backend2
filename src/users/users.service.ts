import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {}

  async createUser(data) {
    const user = await this.prisma.user.create({
      data
    })

    const account = await this.prisma.account.create({
      data: {
        userId: user.id
      }
    })

    await this.prisma.user.update({
      data: {
        accounts: [account.id]
      },
      where: {
        id: user.id
      }
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
      },
      include: {
        allAccounts: true
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

  async deleteUser(username: string) {
    await this.prisma.user.delete({
      where: {
        username
      }
    })

    return {"message": "user deleted successfully"}
  }
}
