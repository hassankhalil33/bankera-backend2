import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { TransactionDto } from './dtos/transaction.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: DatabaseService) {}

  async getAllAccounts(req: Request, res: Response) {
    const allAccounts = await this.prisma.user.findUnique({
      where: {
        username: req.user["username"]
      },
      select: {
        accounts: true
      }
    })

    return res.send(allAccounts);
  }


  async getAccount(accountId: string, res: Response) {
    const foundAccount = await this.prisma.account.findUnique({
      where: {
        id: accountId
      },
      include: {
        sentTransactions: true,
        receivedTransactions: true
      }
    })

    if (!foundAccount) {
      throw new BadRequestException("Account Doesnt Exist");
    }

    const { userId, dateUpdated, ...filteredAccount } = foundAccount;
    return res.send({account: filteredAccount});
  }


  async createNewAccount(req: Request, res: Response) {
    await this.prisma.user.update({
      where: {
        username: req.user["username"]
      },
      data: {
        accountCount: {increment: 1},
        accounts: {
          create: {}
        }
      }
    })

    return res.send({"message": "Account Created Successfully"});
  }


  async handleTransaction(body: TransactionDto, req, res) {
    const { amount, senderAccount, receiverAccount, message } = body;
    const foundAccount = await this.prisma.account.findUnique({
      where: {
        id: senderAccount
      },
      include: {
        User: true
      }
    })

    if (foundAccount.User.username != req.user["username"]) {
      throw new UnauthorizedException("Illegal Transaction");
    }

    if (foundAccount.money < amount) {
      throw new BadRequestException("Not Enough Money");
    }

    await this.prisma.$transaction([
      this.prisma.transaction.create({
        data: {
          senderId: senderAccount,
          receiverId: receiverAccount,
          amount,
          message
        }
      }),

      this.prisma.account.update({
        where: {
          id: senderAccount
        },
        data: {
          money: {decrement: amount}
        }
      }),

      this.prisma.account.update({
        where: {
          id: receiverAccount
        },
        data: {
          money: {increment: amount}
        }
      }),
    ])

    return res.send({"message": "Transaction Completed Successfully"});
  }


  async deleteAccount(AccountId: string, req: Request, res: Response) {
    await this.prisma.account.delete({
      where: {
        id: AccountId
      }
    })

    await this.prisma.user.update({
      where: {
        username: req.user["username"]
      },
      data: {
        accountCount: {decrement: 1}
      }
    })

    return res.send({"message": "Account Deleted Successfully"});
  }
}
