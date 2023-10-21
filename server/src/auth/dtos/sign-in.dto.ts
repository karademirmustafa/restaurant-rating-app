import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({},{message:"Please enter correct email"})
    readonly email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password:string
}