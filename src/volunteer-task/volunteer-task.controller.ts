import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { VolunteerTaskService } from './volunteer-task.service';
import { CreateVolunteerTaskDto } from './dto/create-volunteer-task.dto';
import { UpdateVolunteerTaskDto } from './dto/update-volunteer-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('volunteer-task')
@Controller('volunteer-task')
export class VolunteerTaskController {
  constructor(private readonly volunteerTaskService: VolunteerTaskService) {}

  @Post('create')
  create(@Body() createVolunteerTaskDto: CreateVolunteerTaskDto) {
    return this.volunteerTaskService.create(createVolunteerTaskDto);
  }

  @Get('view-all')
  findAll() {
    return this.volunteerTaskService.findAll();
  }

  @Get('view-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.volunteerTaskService.findOne(id);
  }

  @Get('view-assign-to/:id')
  async viewAssignTo(@Param("id") id: string){
    return this.volunteerTaskService.findByAssignTo(id);
  }

  @Get('view-assign-by/:id')
  async viewAssignBy(@Param("id") id: string){
    return this.volunteerTaskService.findByAssignBy(id);
  }

  @Put('update/:id')
  async doingTask(@Param("id") id: string, @Body() updateVolunteerTaskDto: UpdateVolunteerTaskDto){
    return this.volunteerTaskService.updateTaskProcess(id, updateVolunteerTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerTaskService.remove(id);
  }
}
