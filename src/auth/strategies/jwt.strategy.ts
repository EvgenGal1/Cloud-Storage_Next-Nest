import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Controller, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
@Controller('jwt')
export class JwtStrategy extends PassportStrategy(Strategy) {
  // подкл. u.serv
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  // при расшифр./генер.Токен ч/з jwt.stateg провер.есть ли id в БД
  async validate(payload: any) {
    const user = await this.userService.findById(+payload.id);

    if (!user) {
      throw new UnauthorizedException('У Вас нет доступа');
    }

    return {
      id: user.id /* userId: payload.sub, username: payload.username */,
    };
  }
}
