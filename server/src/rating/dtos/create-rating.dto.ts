import { IsNotEmpty, IsNumber, IsString,Min,Max, Length } from "class-validator";

export class CreateRatingDto {
    @IsString()
    @IsNotEmpty()
    @Length(24) // mongoose object type hexadecimal 24 length
    id:string;
    
    @IsNumber()
    @IsNotEmpty()
    @Min(0, { message: 'Rating must be at least 0' })
    @Max(5, { message: 'Rating must not exceed 5' })
    rate: number;
  }