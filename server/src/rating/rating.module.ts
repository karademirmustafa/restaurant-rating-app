import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './rating.entity';
import { Restaurant, RestaurantSchema } from 'src/restaurants/restaurants.entity';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Module({
  imports: [MongooseModule.forFeature([{name:Rating.name,schema:RatingSchema}]),MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
  controllers: [RatingController],
  providers: [RatingService,RestaurantsService]
})
export class RatingModule {}
