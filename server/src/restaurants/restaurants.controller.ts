import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { SortingEnum } from './types';
import { RateRestaurantDto } from './dtos/rate-restaurant.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {

  constructor(private readonly restaurantsService: RestaurantsService) { }

  @UseGuards(AuthenticationGuard)
  @ApiSecurity('JWT-auth')
  @Post()
  async createRestaurant(@Req() {user},@Body() createRestaurantDto: CreateRestaurantDto) {
    createRestaurantDto.user_id=user.id;
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  async findRestaurants(@Query('page') page: string, @Query('sorting') sorting: SortingEnum) { // Query all string Number of page 
    return this.restaurantsService.findAll(Number(page), sorting);
  }
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthenticationGuard)
  @Post("/rate/:id")
  async rateRestaurant(@Param('id') restaurantId: string, @Body() rateRestaurantDto: RateRestaurantDto,@Req() {user} ) {
    rateRestaurantDto.user_id=user.id
    return this.restaurantsService.rate(restaurantId, rateRestaurantDto)
  }

}
