import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
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
  login(@Body() body: LoginDto, @Req() req, @Res() res) {
    return this.authService.loginUser(body, req, res);
  };

  @Get("/logout")
  logout(@Req() req, @Res() res) {
    return this.authService.logoutUser(req, res);
  };
};
