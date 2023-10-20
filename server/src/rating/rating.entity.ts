import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Rating extends Document {
    @Prop()
    rate: number;

    @Prop({ type: Types.ObjectId, ref: 'Restaurant' })
    restaurant_id: Types.ObjectId; 

    @Prop({type:Types.ObjectId,ref:"User"})
    user_id:Types.ObjectId;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
