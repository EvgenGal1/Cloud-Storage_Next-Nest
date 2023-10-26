import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // ч/з внедрение зависимостей, добав.доп.repository UserEntity. Указав так repositorий, получ.возм.внутри этого кл.UsersService раб.с табл.users
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  // получ.user по email
  async findByEmail(email: string) {
    // после @InjectRepository(FileEntity) в любом мтд.UsersService, можем обращ.к this.repository для получ.доступ. ко всем мтд.БД табл.users
    return this.repository.findOneBy({ email });
  }

  // получ.user по id
  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  // созд.user ч/з получ.объ при req с инфо о user
  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  // удал.после InjectRepository
  // create(createUserDto: CreateUserDto) {
  //   return 'Это действие добавляет нового пользователя';
  // }

  // findAll() {
  //   return `Это действие возвращает всех пользователей`;
  // }

  // findOne(id: number) {
  //   return `Это действие возвращает пользователя с ID_#${id}`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `Это действие обновляет пользователя с ID_#${id}`;
  // }

  // remove(id: number) {
  //   return `Это действие удаляет пользователя с ID_#${id}`;
  // }
}
