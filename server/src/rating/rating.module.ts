import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './rating.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:Rating.name,schema:RatingSchema}])],
  controllers: [],
  providers: [RatingService],
  exports:[RatingService]
})
export class RatingModule {}
