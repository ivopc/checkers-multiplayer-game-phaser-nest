import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-unused-vars
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const httpAdapter = app.get(HttpAdapterHost);
  const config = new DocumentBuilder()
    .setTitle('Checkers Multiplayer Game Server')
    .setDescription('Checkers Multiplayer Game Server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
