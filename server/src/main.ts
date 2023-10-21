import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //Swagger
  const config = new DocumentBuilder()
    .setTitle("Restaurant Rating App")
    .setDescription("Restaurant Rating App | Api Docs")
    .setVersion("1.0")
    .addBearerAuth({
      type:'http',
      scheme:'bearer',
      bearerFormat:'JWT',
      name:'JWT',
      description:'Enter JWT Token',
      in:'header'
    },"JWT-auth")
    .build();

    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('api-docs',app,document);

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
