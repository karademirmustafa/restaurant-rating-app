import { Body, Controller, HttpCode, Post, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('login')
    @ApiOperation({ summary: 'email and password with login' })
    @ApiResponse({
        status: 200,
        description: 'Successfull sign in'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request'
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'mail@gmail.com',
                    description: 'unique email'
                },
                password: {
                    type: 'string',
                    example: 'a133..,!B',
                    description: 'min 8 characters'
                }
            }
        }
    })
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
        const jwt = await this.authService.signIn(signInDto);
        if (!jwt) throw new UnauthorizedException();

        response.cookie('jwt', jwt.token, { httpOnly: true })
        return { token: jwt.token }
    }

    @Post('register')
    @ApiOperation({ summary: 'email and password with register' })
    @ApiResponse({
        status: 200,
        description: 'Successfull sign up'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'mail@gmail.com',
                    description: 'unique email'
                },
                password: {
                    type: 'string',
                    example: 'a133..,!B',
                    description: 'min 8 characters'
                }
            }
        }
    })
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
