import { Module } from '@nestjs/common';
import { VolunteerTaskService } from './volunteer-task.service';
import { VolunteerTaskController } from './volunteer-task.controller';

@Module({
  controllers: [VolunteerTaskController],
  providers: [VolunteerTaskService],
})
export class VolunteerTaskModule {}
