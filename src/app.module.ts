import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, AccountsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
