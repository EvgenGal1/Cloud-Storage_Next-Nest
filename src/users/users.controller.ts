import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
// спец.тег swagger ч/з декоратор ApiTags для групп.мтд.cntrl users
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // // мтд.для получ.всех ф.списком.масс. Обращ.к files, возвращ.масс.всех ф. При получ.запроса обращ.к serv берём мтд.findAll который обращ.к БД, резулт.данн.fn вернёт в ответ на данн.запрос
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // удал.после @InjectRepository(FileEntity) в u.serv.ts
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
