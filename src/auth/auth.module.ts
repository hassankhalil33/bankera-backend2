import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { AccessStrategy } from './strategies/access.strategy';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, RefreshStrategy, AccessStrategy]
})
export class AuthModule {}
