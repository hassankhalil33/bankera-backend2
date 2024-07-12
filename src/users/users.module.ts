import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { AccessStrategy } from 'src/auth/strategies/access.strategy';
import { RefreshStrategy } from 'src/auth/strategies/refresh.strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, AccessStrategy, RefreshStrategy],
})
export class UsersModule {}
