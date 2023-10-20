import { Body, Controller, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {

    constructor(private readonly restaurantsService:RestaurantsService){}

    @Post()
    async createRestaurant(@Body() createRestaurantDto:CreateRestaurantDto){
        return this.restaurantsService.create(createRestaurantDto);

    }

}
