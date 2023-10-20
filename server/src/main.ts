import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validation
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  // react default port
  app.enableCors({ origin: 'http://localhost:3000', credentials: true })
  await app.listen(port);
}
bootstrap();
