import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min, Max} from "class-validator";

export class RateRestaurantDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rate: number;

  user_id:string;
}