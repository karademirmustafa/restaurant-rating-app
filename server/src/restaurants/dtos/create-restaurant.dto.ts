import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength,Min,Max } from "class-validator";

export class CreateRestaurantDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(0, { message: 'Rating must be at least 0' })
    @Max(5, { message: 'Rating must not exceed 5' })
    rating?: number;

    user_id:string;
  }