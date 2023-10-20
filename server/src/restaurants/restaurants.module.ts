import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurants.entity';
import { Rating, RatingSchema } from 'src/rating/rating.entity';
import { RatingService } from 'src/rating/rating.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]), MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RatingService]
})
export class RestaurantsModule { }
