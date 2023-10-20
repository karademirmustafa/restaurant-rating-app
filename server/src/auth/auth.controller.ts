import { Body, Controller, HttpCode, Post, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import * as bcrypt from "bcryptjs";
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    

    @Post('login')
    async signIn(@Body() signInDto:SignInDto,@Res({passthrough:true}) response:Response){
        const jwt=await this.authService.signIn(signInDto);
        if(!jwt) throw new UnauthorizedException();

       response.cookie('jwt',jwt.token,{httpOnly:true})
       return {message:"Success sign in",statusCode:200}
    }

    @Post('register')
    signUp(@Body() signUpDto:SignUpDto){
        return this.authService.signUp(signUpDto);
    }
}
