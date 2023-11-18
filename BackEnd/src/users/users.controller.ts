import {
  Controller,
  // Get,
  Post,
  Body,
  UseGuards,
  Get,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('users')
// спец.тег swagger ч/з декоратор ApiTags для групп.мтд.cntrl users
@ApiTags('users')
// оборач.чтоб swagger знал что req на files защищены jwt Токеном
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // req за инфо о user
  @Get('/me')
  // оборач.в`охранник`(Guards как MW,`перехватчик`(interceptor))
  @UseGuards(JwtAuthGuard)
  // мтд.нахожд.user по id. Ч/з декор.UserId вытаск.id
  getMe(@UserId() id: number) {
    return this.usersService.findById(id);
  }

  // пробы переноса мтд.под serv
  // @Get(':email')
  // findByEmail(@Param('email') email: string) {
  //   return this.usersService.findByEmail(email);
  // }
  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return this.usersService.findById(+id);
  // }

  // коммит.после @InjectRepository(FileEntity) в u.serv.ts
  // мтд.для получ.всех ф.списком.масс. Обращ.к files, возвращ.масс.всех ф. При получ.запроса обращ.к serv берём мтд.findAll который обращ.к БД, резулт.данн.fn вернёт в ответ на данн.запрос
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
