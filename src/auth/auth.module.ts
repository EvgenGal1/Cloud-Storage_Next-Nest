import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  // подкл.для использ. u.,psw.module
  imports: [UsersModule, PassportModule],
  // подкл. loc.strat
  controllers: [AuthController, LocalStrategy],
  providers: [AuthService],
})
export class AuthModule {}
