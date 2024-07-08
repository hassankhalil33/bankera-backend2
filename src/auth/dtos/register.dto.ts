import { IsEmail, IsNotEmpty } from "class-validator";
import { LoginDto } from "./login.dto";


export class RegisterDto extends LoginDto{
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
