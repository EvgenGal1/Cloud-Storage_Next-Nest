import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  // подкл.для использ. u.,psw.,jwt.module.
  imports: [
    UsersModule,
    PassportModule,
    // Для jwt использ.мтд.registAsync т.к. настр.в отдел.ф.,
    JwtModule.registerAsync({
      // получ.: настр.config, настр.ключа, врем.жизни Токен
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: { expiresIn: configService.get('EXPIRES_IN') },
        };
      },
    }),
  ],
  // подкл. loc.,jwt.strat
  controllers: [AuthController, LocalStrategy, JwtStrategy],
  providers: [AuthService],
})
export class AuthModule {}
