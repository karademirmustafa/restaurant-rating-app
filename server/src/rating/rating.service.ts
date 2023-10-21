import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './rating.entity';
import { Model } from 'mongoose';
import { CreateRatingDto } from "./dtos/create-rating.dto"

@Injectable()
export class RatingService {

    constructor(@InjectModel(Rating.name) private ratingModel: Model<Rating>) { }

    async findRatingRestaurant(id: string) {
        const ratings = await this.ratingModel.find({ restaurant_id: id }).exec();
        return ratings;
    }
    async findOneRating(restaurant_id: string, user_id) {
        const rating = await this.ratingModel.findOne({ restaurant_id, user_id });

        // if (!rating) throw new NotFoundException("Not found rating");
        return rating ? rating : null;
    }

    async calculateRating(id: string) {
        const ratings = await this.findRatingRestaurant(id);

        const aritmetik = ratings.reduce((acc, current) => acc += current.rate, 0)

        return Number((Number(aritmetik) / ratings.length).toFixed(2));
    }
    async create(createRatingDto: CreateRatingDto, userId: string) {
        const { rate, id } = createRatingDto;
        try {
            const newRating = new this.ratingModel({ rate, restaurant_id: id, user_id: userId });
            return newRating.save();
        } catch (err) {
            throw new BadRequestException();
        }
    }

}
