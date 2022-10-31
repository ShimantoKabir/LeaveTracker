import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(process.env.PORT);
}

bootstrap().then(r => console.log(`App running on port ${process.env.PORT}....!`));
