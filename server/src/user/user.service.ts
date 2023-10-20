import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel:Model<User>){}

    async findOne(userDto:UserDto){
        return this.userModel.findOne({...userDto});
    }
    async create(email:string,password:string){
        const newUser =  new this.userModel({email,password});

        return await newUser.save()
    }

}
