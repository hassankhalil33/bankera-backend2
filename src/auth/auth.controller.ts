import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  register() {
    return this.authService.registerUser();
  };

  @Post("/login")
  login() {
    return this.authService.loginUser();
  };

  @Post("/logout")
  logout() {
    return this.authService.logoutUser();
  };
};
