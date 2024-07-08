import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: DatabaseService) {}

  registerUser(body) {
    return {"message": "User Registered Successfully", body};
  };

  loginUser(body) {
    return {"message": "User Loggedin Successfully", body};
  };

  logoutUser() {
    return {"message": "User Loggedout Successfully"};
  };
};
