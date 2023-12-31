import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Controller, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
@Controller('local')
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (/* !user - ошб. - не может быть "void" */ user === null) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return user;
  }
}
