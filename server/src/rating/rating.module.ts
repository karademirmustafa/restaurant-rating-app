import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './rating.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:Rating.name,schema:RatingSchema}])],
  controllers: [RatingController],
  providers: [RatingService],
  exports:[RatingService]
})
export class RatingModule {}
