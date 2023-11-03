import { ApiProperty } from '@nestjs/swagger';

// разрещ.данн.req front > dack. Отдел.кл.с опис.ожид.св-в
export class CreateUserDto {
  // доп.декор для поним.swagger какие есть св-ва. Можно указ.знач.по умолч. в {default:''}
  @ApiProperty({
    default: 'Test@Test.ru',
  })
  email: string;

  @ApiProperty({
    default: '123_Test',
  })
  password: string;

  @ApiProperty({
    default: 'Тест Тестович',
  })
  fullName: string;

  // упразднил DTO созд.usera
  // @ApiProperty({
  //   default: 'USER',
  // })
  // role: string;

  // @ApiProperty({
  //   default: false,
  // })
  // activated: boolean;

  // @ApiProperty({
  //   default: '--',
  // })
  // link: string;
}
