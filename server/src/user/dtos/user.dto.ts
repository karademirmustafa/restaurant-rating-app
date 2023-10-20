import { IsNotEmpty, IsString,Min,Max, IsEmail } from "class-validator";

export class UserDto {
    @IsString()
    @Min(3)
    @Max(16)
    username?:string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
  }