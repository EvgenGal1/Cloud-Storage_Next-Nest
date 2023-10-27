import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  // подкл. u.serv ч/з внедр.завис.
  constructor(private userService: UsersService) {}

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

  // мтд.Регистрации
  async register(createUserDto: CreateUserDto) {
    try {
      // созд.user
      const userData = await this.userService.create(createUserDto);
      // получ.инфо о user
      return userData;
    } catch (err) {
      console.log(err);
      throw new ForbiddenException(`Ошибка при регистрации ${err}`);
    }
  }
}
