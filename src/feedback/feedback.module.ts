import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './schemas/feedback.schema';
import { UserModule } from 'src/user/user.module';
import { PetModule } from 'src/pet/pet.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Feedback.name, schema: FeedbackSchema }]),
    UserModule,
    PetModule,
],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [MongooseModule],
})
export class FeedbackModule {}
