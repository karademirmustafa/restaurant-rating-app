import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // Validation
  app.useGlobalPipes(new ValidationPipe())
  const port = configService.get('port');
  // Error Handling
  const logger = new Logger(); // Create a Logger instance
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  // react default port
  app.enableCors({ origin: 'http://localhost:3000', credentials: true })
  await app.listen(port);
}
bootstrap();
