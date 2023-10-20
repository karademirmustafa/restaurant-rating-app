import { Dependencies, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dtos/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcryptjs";
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
@Injectable()
@Dependencies(UserService)
export class AuthService {

  constructor(@Inject(forwardRef(() => UserService)) private userService: UserService, @Inject(forwardRef(() => JwtService)) private readonly jwtService: JwtService) { }

  async signIn(signInDto:SignInDto): Promise<{ token: string }> {

    const {email,password:pass} = signInDto;
    const user = await this.userService.findOne({ email });
    if(!user) throw new UnauthorizedException('Invalid email or password')
    const isPasswordMatched= await bcrypt.compare(pass,user.password);

    if (!isPasswordMatched) throw new UnauthorizedException('Invalid email or password');
    
    const payload = { id: user?._id, email: user.email };
    return { token: await this.jwtSignature(payload) }
  }

  async signUp(signUpDto:SignUpDto): Promise<{ token: string }> {
    const {email,password:pass} = signUpDto;
    const hashedPassword = await bcrypt.hash(pass, 10)

    const newUser = await this.userService.create(email, hashedPassword);
    const payload = { id: newUser?._id, email: newUser.email };

    return { token: await this.jwtSignature(payload) }
  }

  async jwtSignature(payload: { id: string, email: string }):Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

}
