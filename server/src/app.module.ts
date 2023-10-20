import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { MongooseModule } from "@nestjs/mongoose";
import { RestaurantsModule } from './restaurants/restaurants.module';
import { RatingModule } from './rating/rating.module';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,load:[config]}),MongooseModule.forRoot(config().mongo_uri), RestaurantsModule, RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
