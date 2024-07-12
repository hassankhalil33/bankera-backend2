import { Controller, Post, Body, Req, Res, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard("refresh"))
  @Get("/logout")
  logout(@Req() req, @Res() res) {
    return this.authService.logoutUser(req, res);
  };

  @UseGuards(AuthGuard("refresh"))
  @Get("/refresh")
  refresh(@Req() req, @Res() res) {
    return this.authService.refreshUser(req, res);
  };
};
