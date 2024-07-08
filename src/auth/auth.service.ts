import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: DatabaseService) {}

  registerUser() {
    return {"message": "User Registered Successfully"};
  };

  loginUser() {
    return {"message": "User Loggedin Successfully"};
  };

  logoutUser() {
    return {"message": "User Loggedout Successfully"};
  };
};
