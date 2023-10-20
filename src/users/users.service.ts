import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'Это действие добавляет нового пользователя';
  }

  findAll() {
    return `Это действие возвращает всех пользователей`;
  }

  findOne(id: number) {
    return `Это действие возвращает пользователь с ID_#${id}`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `Это действие обновляет пользователя с ID_#${id}`;
  }

  remove(id: number) {
    return `Это действие удаляет пользователя с ID_#${id}`;
  }
}
