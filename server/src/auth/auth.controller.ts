import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    

    @Post('login')
    async signIn(@Body() signInDto:Record<string,any>,@Res({passthrough:true}) response:Response){
        const jwt=await this.authService.signIn(signInDto.email,signInDto.password)
       response.cookie('jwt',jwt.access_token,{httpOnly:true})
       return {message:"Success sign in",statusCode:200}
    }

    @Post('register')
    signUp(@Body() signUpDto:Record<string,any>){
        return this.authService.signUp(signUpDto.email,signUpDto.password);
    }
}
