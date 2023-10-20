import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  // в 2х местах откл. cors
  app.enableCors({ credentials: true, origin: true });

  // настр.из nest/openapi/introduction, измен.на свои swagger
  const config = new DocumentBuilder()
    .setTitle('Облачное хранилище')
    // .setDescription('Описание API Облачного хранилища')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // меняем путь вместо 'api' - 'swagger'
  SwaggerModule.setup('swagger', app, document);

  // свой порт
  await app.listen(7531);
}
bootstrap();
