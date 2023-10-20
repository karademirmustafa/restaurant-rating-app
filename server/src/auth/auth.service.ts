import { Dependencies, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dtos/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
@Dependencies(UserService)
export class AuthService {

    constructor(@Inject(forwardRef(() => UserService)) private userService: UserService,@Inject(forwardRef(() => JwtService)) private readonly jwtService: JwtService) { }

    async signIn(email:string,pass:string) {
        const user = await this.userService.findOne({email,password:pass});
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = {id:user?._id,email:user.email};
        const jwt = await this.jwtService.signAsync(payload)
        // return {access_token:await this.jwtService.signAsync(payload)};
        return {access_token:jwt}
      }

      async signUp(email:string,pass:string):Promise<User>{
        const newUser = await this.userService.create(email,pass);
        return newUser
      }

}
