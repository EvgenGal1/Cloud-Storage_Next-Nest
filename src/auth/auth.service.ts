import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  // подкл. u.serv ч/з внедр.завис.
  constructor(private userService: UsersService) {}

  // пров.log,psw.
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
}
