import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './rating.entity';
import { Model } from 'mongoose';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class RatingService {

    constructor(@InjectModel(Rating.name) private readonly ratingModel: Model<Rating>, private readonly restaurantsService: RestaurantsService) { }

    async findRatingRestaurant(id: string) {
        const ratings = await this.ratingModel.find({ restaurant_id: id }).exec();
        return ratings;
    }

    async create(createRatingDto: CreateRatingDto) {
        const { rating, id } = createRatingDto;

        const restaurant = await this.restaurantsService.findById(id);
        if (!restaurant) throw new NotFoundException('No restaurant found to rate')
        try {
            const newRating = new this.ratingModel({ rating, restaurant_id: id });
            return newRating.save();
        } catch (err) {
            throw new err
        }
    }

}
