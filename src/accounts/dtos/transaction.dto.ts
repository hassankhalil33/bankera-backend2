import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class TransactionDto {
  @IsString()
  @IsNotEmpty()
  senderAccount: string

  @IsString()
  @IsNotEmpty()
  receiverAccount: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsString()
  @IsOptional()
  message: string
}
