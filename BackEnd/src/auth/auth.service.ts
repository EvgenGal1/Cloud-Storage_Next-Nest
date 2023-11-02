import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  // подкл. u.,jwt.serv ч/з внедр.завис.
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // мтд.пров.log,psw.
  async validateUser(email: string, password: string): Promise<any> {
    // Наход.user по email
    const user = await this.userService.findByEmail(email);

    // провер.psw с psw.БД // ! пока без шифр.
    if (user && user.password == password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    // возвращ.null при неудаче
    return null;
  }

  // мтд.Авторизации. Получ.инфо о user и шифр.в jwt
  async login(user: UserEntity) {
    return { token: this.jwtService.sign({ id: user.id }) };
  }

  // мтд.Регистрации
  async register(createUserDto: CreateUserDto) {
    try {
      // созд.user
      const userData = await this.userService.create(createUserDto);
      // return userData; - получ.инфо о user
      // генер.Токен при Регистр
      return { token: this.jwtService.sign({ id: userData.id }) };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException(`Ошибка при регистрации ${err}`);
    }
  }
}
