import { IsNotEmpty, IsString } from "class-validator"


export class TransactionDto {
  @IsString()
  @IsNotEmpty()
  senderAccount: string

  @IsString()
  @IsNotEmpty()
  receiverAccount: string

  @IsNotEmpty()
  amount: number

  @IsString()
  message: string
}
