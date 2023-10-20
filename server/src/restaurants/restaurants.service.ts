import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './restaurants.entity';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { SortOptions } from './types';
@Injectable()
export class RestaurantsService {
    constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>) { }
    async create(createRestaurantDto: CreateRestaurantDto) {
        const newRestaurant = new this.restaurantModel(createRestaurantDto);
        return newRestaurant.save();
    }

    async findAll(page: number, sorting: 'ASC' | 'DESC') {
        const pageSize = 10;
        if (!page) {
            page = 1
        }
        const skip = (page - 1) * pageSize;

        // Sorting Options
        const sortOptions: SortOptions = {
            rating: -1
        };
        if (sorting === 'ASC') {
            sortOptions.rating = 1; // lte sorting 
        } else {
            sortOptions.rating = -1 // gte sorting
        }


        const totalRestaurants = await this.restaurantModel.countDocuments(); // Total Restaurants count
        const totalPages = Math.ceil(totalRestaurants / pageSize);

        const restaurants = await this.restaurantModel
            .find()
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize)
            .exec();

        return {
            restaurants,
            page,
            totalPages,
            totalItems: totalRestaurants
        };
    }






}
