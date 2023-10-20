import { BadRequestException, Dependencies, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './restaurants.entity';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { SortOptions } from './types';
import { RatingService } from 'src/rating/rating.service';
import { RateRestaurantDto } from './dtos/rate-restaurant.dto';
import { User } from 'src/user/user.entity';

@Injectable()
@Dependencies(RatingService)
export class RestaurantsService {
    constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>, @Inject(forwardRef(() => RatingService))
    private ratingService: RatingService,) {
    }
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

    async findById(id: string) {
        const restaurant = await this.restaurantModel.findById(id).select("-__v");

        if (!restaurant) throw new NotFoundException('Restaurant not found');

        return restaurant;
    }


    async rate(id: string, rate: RateRestaurantDto) {
        const { user_id } = rate;
        const restaurant = await this.findById(id);
        if (!restaurant) throw new NotFoundException('No restaurant found to rate');
        const exist_rate_user = await this.ratingService.findOneRating(id, user_id);
        try {
            if (exist_rate_user) {
                exist_rate_user.rate = rate.rate;
                await exist_rate_user.save();
            } else {
                await this.ratingService.create({ id, rate: rate.rate }, rate.user_id);

            }

            const calculateAverage = await this.ratingService.calculateRating(id);

            return {
                statusCode: 200,
                message: "Successfull",
                data: {
                    rate: calculateAverage,
                    restaurant
                }
            }

        } catch (err) { throw new BadRequestException() }



    }







}
