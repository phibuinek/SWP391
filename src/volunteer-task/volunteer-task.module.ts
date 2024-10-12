import { Module } from '@nestjs/common';
import { VolunteerTaskService } from './volunteer-task.service';
import { VolunteerTaskController } from './volunteer-task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VolunteerTask, VolunteerTaskSchema } from './schemas/volunteer-task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VolunteerTask.name, schema: VolunteerTaskSchema },
    ]), // Đăng ký model Pet
  ],
  controllers: [VolunteerTaskController],
  providers: [VolunteerTaskService],
})
export class VolunteerTaskModule {}
