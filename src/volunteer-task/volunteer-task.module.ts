import { Module } from '@nestjs/common';
import { VolunteerTaskService } from './volunteer-task.service';
import { VolunteerTaskController } from './volunteer-task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VolunteerTask, VolunteerTaskSchema } from './schemas/volunteer-task.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VolunteerTask.name, schema: VolunteerTaskSchema },]), 
    UserModule,
  ],
  controllers: [VolunteerTaskController],
  providers: [VolunteerTaskService],
  exports: [MongooseModule],
})
export class VolunteerTaskModule {}
