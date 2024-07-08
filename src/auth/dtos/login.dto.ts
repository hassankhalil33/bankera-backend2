import { IsNotEmpty, IsString, Length } from "class-validator";


export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 28, {"message": "password must be between 8 and 28 chars long"})
  password: string;
}
