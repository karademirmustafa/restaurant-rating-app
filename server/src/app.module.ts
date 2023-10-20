import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { MongooseModule } from "@nestjs/mongoose";
import { RestaurantsModule } from './restaurants/restaurants.module';
import { RatingModule } from './rating/rating.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './middlewares/logging.middleware.ts';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,load:[config]}),MongooseModule.forRoot(config().mongo_uri), RestaurantsModule, RatingModule, UserModule, AuthModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*') // All
  }
}
