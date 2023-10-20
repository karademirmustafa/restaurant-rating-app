import { Dependencies, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './rating.entity';
import { Model } from 'mongoose';
import { CreateRatingDto } from "./dtos/create-rating.dto"
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class RatingService {

    constructor(@InjectModel(Rating.name) private  ratingModel: Model<Rating>) { }

    async findRatingRestaurant(id: string) {
        const ratings = await this.ratingModel.find({ restaurant_id: id }).exec();
        return ratings;
    }

    async calculateRating(id:string){
        const ratings = await this.findRatingRestaurant(id);

        // aritmetik ortalama
       const aritmetik= ratings.reduce((acc,current) => acc+=current.rate,0)

       return Number((Number(aritmetik)/ratings.length).toFixed(2));
    }
    async create(createRatingDto: CreateRatingDto) {
        const { rate, id } = createRatingDto;

        // const restaurant = await this.restaurantsService.findById(id);
        // if (!restaurant) throw new NotFoundException('No restaurant found to rate')
        try {
            const newRating = new this.ratingModel({ rate, restaurant_id: id });
            return newRating.save();
        } catch (err) {
            throw new err
        }
    }

}
