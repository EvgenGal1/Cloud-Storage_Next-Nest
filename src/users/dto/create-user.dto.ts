import { ApiProperty } from '@nestjs/swagger';

// разрещ.данн.res front > dack. Отдел.кл.с опис.ожид.св-в
export class CreateUserDto {
  // доп.декор для поним.swagger какие есть св-ва. Можно указ.знач.по умолч. в {default:''}
  @ApiProperty({
    default: 'test@test.ru',
  })
  email: string;

  @ApiProperty({
    default: '123_Тест',
  })
  password: string;

  @ApiProperty({
    default: 'Тест Тестович',
  })
  fullName: string;

  @ApiProperty({
    default: '123_Тест',
  })
  role: string;

  @ApiProperty({
    default: false,
  })
  activated: boolean;

  @ApiProperty({
    default: '--',
  })
  link: string;
}
