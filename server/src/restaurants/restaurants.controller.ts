import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { SortingEnum } from './types';

@Controller('restaurants')
export class RestaurantsController {

    constructor(private readonly restaurantsService:RestaurantsService){}

    @Post()
    async createRestaurant(@Body() createRestaurantDto:CreateRestaurantDto){
        return this.restaurantsService.create(createRestaurantDto);
    }

    @Get()
    findRestaurants(@Query('page') page: string,@Query('sorting') sorting:SortingEnum) { // Query all string Number of page 
      return this.restaurantsService.findAll(Number(page),sorting);
    }
  


}
