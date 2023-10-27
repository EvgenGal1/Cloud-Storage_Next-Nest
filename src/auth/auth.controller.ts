import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // ч/з внедр.завис.подкл. auth.serv
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  // указ.какой объ.передавать в мтд.
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    return req.user;
  }

  // мтд.Регистрации
  @Post('/register')
  // получ.объ из запроса ч/з @Body
  register(@Body() createUserDto: CreateUserDto) {
    // объ передаём в мтд.register в auth.serv
    return this.authService.register(createUserDto);
  }
}
