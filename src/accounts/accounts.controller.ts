import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TransactionDto } from './dtos/transaction.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAll() {
    return this.accountsService.getAllAccounts();
  }

  @Get("/:account")
  getAccount(@Param("account") params) {
    return this.accountsService.getAccount(params);
  }

  @Patch()
  handleTransaction(@Body() body: TransactionDto) {
    return this.accountsService.handleTransaction(body);
  }

  @Delete("/:account")
  deleteAccount(@Param("account") params) {
    return this.accountsService.deleteAccount(params);
  }
}
