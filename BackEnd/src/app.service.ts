import { Injectable } from '@nestjs/common';

// Ввод Provider в др.кл.ч/з `@Инъекции`
@Injectable()
export class AppService {
  getHello(): string {
    return 'Привет, мир!';
  }
}
