// ^ разрещ.данн.req front > dack. Отдел.кл.с опис.ожид.св-в
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // доп.декор для поним.swagger какие есть св-ва. Можно указ.знач.по умолч. в {default:''}
  @ApiProperty({
    // default: 'Test@Test.ru',
    default: 'zbst.1@yandex.ru',
  })
  email: string;

  @ApiProperty({
    // default: '123_Test',
    default: 'zbst.1@yandex.ruPSW',
  })
  password: string;

  @ApiProperty({
    // default: 'Тест Тестович',
    // default: 'Евгений',
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
