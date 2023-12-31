import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

// попытка HMR с webpack
// declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  // в 2х местах откл. cors
  app.enableCors({ credentials: true, origin: true });

  // MW для путей файлов в uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Настр.док. Настр.из nest/openapi/introduction, измен.на свои swagger
  const config = new DocumentBuilder()
    .setTitle('Облачное хранилище')
    // .setDescription('Описание API Облачного хранилища')
    .setVersion('1.0')
    // настр.для использ.jwt.Токен в swagger
    .addBearerAuth()
    // .addTag('cats')
    .build();
  // созд.док.(экземп.прилож., объ.парам., специф.доступа(3ий не обязат.парам.))
  const document = SwaggerModule.createDocument(app, config);
  // меняем путь вместо 'api' - 'swagger'. (путь устан.swg, экземп.прилож., объ.док.)
  SwaggerModule.setup('swagger', app, document, {
    // настр.для использ.jwt.Токен в swagger
    swaggerOptions: { persisAuthorization: true },
  });

  // ? свой порт сервера ? клиента
  await app.listen(7531 /* 5125 */);

  // попытка HMR с webpack
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();
