import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VolunteerTaskService } from './volunteer-task.service';
import { CreateVolunteerTaskDto } from './dto/create-volunteer-task.dto';
import { UpdateVolunteerTaskDto } from './dto/update-volunteer-task.dto';

@Controller('volunteer-task')
export class VolunteerTaskController {
  constructor(private readonly volunteerTaskService: VolunteerTaskService) {}

  @Post()
  create(@Body() createVolunteerTaskDto: CreateVolunteerTaskDto) {
    return this.volunteerTaskService.create(createVolunteerTaskDto);
  }

  @Get()
  findAll() {
    return this.volunteerTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteerTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVolunteerTaskDto: UpdateVolunteerTaskDto) {
    return this.volunteerTaskService.update(+id, updateVolunteerTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerTaskService.remove(+id);
  }
}
