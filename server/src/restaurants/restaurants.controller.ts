import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { SortingEnum } from './types';
import { RateRestaurantDto } from './dtos/rate-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {

    constructor(private readonly restaurantsService:RestaurantsService){}

    @Post()
    async createRestaurant(@Body() createRestaurantDto:CreateRestaurantDto){
        return this.restaurantsService.create(createRestaurantDto);
    }

    @Get()
    async findRestaurants(@Query('page') page: string,@Query('sorting') sorting:SortingEnum) { // Query all string Number of page 
      return this.restaurantsService.findAll(Number(page),sorting);
    }
  
    @Post("/rate/:id")
    async rateRestaurant(@Param('id') restaurantId:string,@Body() rateRestaurantDto:RateRestaurantDto){
      return this.restaurantsService.rate(restaurantId,rateRestaurantDto)
    }
    @Get("/alkan")
    async getAlkan(){
      return this.restaurantsService.alkan();
    }
}
