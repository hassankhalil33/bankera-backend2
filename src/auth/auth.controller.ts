import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  register(@Body() body: RegisterDto) {
    return this.authService.registerUser(body);
  };

  @Post("/login")
  login(@Body() body: LoginDto) {
    return this.authService.loginUser(body);
  };

  @Post("/logout")
  logout() {
    return this.authService.logoutUser();
  };
};
