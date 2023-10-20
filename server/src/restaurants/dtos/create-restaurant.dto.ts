import { IsNotEmpty, IsNumber, IsString, MinLength,Min,Max } from "class-validator";

export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0, { message: 'Rating must be at least 0' })
    @Max(5, { message: 'Rating must not exceed 5' })
    rating: number;
  }