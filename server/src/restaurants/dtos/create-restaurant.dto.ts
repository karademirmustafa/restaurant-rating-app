import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    rating: number;
  }