import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false }) // createdAt and updatedAt auto added
export class Restaurant extends Document {
  @Prop({type:Types.ObjectId,ref:"User"})
  user_id:Types.ObjectId;
  
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);