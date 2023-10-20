import { IsNotEmpty, IsNumber, Min, Max, IsString, Length } from "class-validator";

export class RateRestaurantDto {

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rate: number;
}