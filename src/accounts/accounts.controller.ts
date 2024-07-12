import { Body, Controller, Delete, Get, Post, Param, Patch, Req, Res } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TransactionDto } from './dtos/transaction.dto';
import { Request, Response } from 'express';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAll(@Req() req: Request, @Res() res: Response) {
    return this.accountsService.getAllAccounts(req, res);
  }

  @Get("/:account")
  getAccount(@Param("account") params, @Res() res: Response) {
    return this.accountsService.getAccount(params, res);
  }

  @Post()
  createAccount(@Req() req: Request, @Res() res: Response) {
    return this.accountsService.createNewAccount(req, res);
  }

  @Patch()
  handleTransaction(@Body() body: TransactionDto, @Req() req: Request, @Res() res: Response) {
    return this.accountsService.handleTransaction(body, req, res);
  }

  @Delete("/:account")
  deleteAccount(@Param("account") params, @Req() req: Request, @Res() res: Response) {
    return this.accountsService.deleteAccount(params, req, res);
  }
}
