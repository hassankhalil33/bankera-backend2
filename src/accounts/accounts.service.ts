import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: DatabaseService) {}

  getAllAccounts() {
    return {"message": "inside all accounts"}
  }

  getAccount(params) {
    return {params}
  }

  handleTransaction(body) {
    return {body}
  }

  deleteAccount(params) {
    return {params}
  }
}
