import { IsNotEmpty, IsNumber, IsString, IsIn } from "class-validator";
import {SortingEnum} from "../types";


export class FindRestaurantDto {
  @IsNumber({}, { message: 'Page must be a number' })
  @IsNotEmpty({ message: 'Page is required' })
  page: number;

  @IsString()
  @IsIn([SortingEnum.ASC, SortingEnum.DESC], { message: 'Sorting must be ASC or DESC' })
  sorting: SortingEnum;
}


