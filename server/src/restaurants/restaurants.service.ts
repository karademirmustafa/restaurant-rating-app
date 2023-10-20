import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './restaurants.entity';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
@Injectable()
export class RestaurantsService {
    constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>) { }
    async create(createRestaurantDto : CreateRestaurantDto) {
        const newRestaurant = new this.restaurantModel(createRestaurantDto);
        return newRestaurant.save();
    }
}
