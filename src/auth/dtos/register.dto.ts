import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { LoginDto } from "./login.dto";


export class RegisterDto extends LoginDto{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 28, {"message": "password must be between 8 and 28 chars long"})
  password: string;
}

