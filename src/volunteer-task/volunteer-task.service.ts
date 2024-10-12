import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateVolunteerTaskDto } from "./dto/create-volunteer-task.dto";
import { UpdateVolunteerTaskDto } from "./dto/update-volunteer-task.dto";
import {
  VolunteerTask,
  VolunteerTaskDocument,
} from "./schemas/volunteer-task.schema";

@Injectable()
export class VolunteerTaskService {
  constructor(
    @InjectModel(VolunteerTask.name)
    private volunteerTaskModel: Model<VolunteerTaskDocument>,
  ) {}

  // Tạo mới một công việc tình nguyện
  async create(
    createVolunteerTaskDto: CreateVolunteerTaskDto,
  ): Promise<VolunteerTask> {
    const newVolunteerTask = new this.volunteerTaskModel(
      createVolunteerTaskDto,
    );
    return newVolunteerTask.save();
  }

  // Lấy tất cả công việc tình nguyện
  async findAll(): Promise<VolunteerTask[]> {
    return this.volunteerTaskModel.find().exec();
  }

  // Lấy thông tin công việc tình nguyện theo ID
  async findOne(id: string): Promise<VolunteerTask> {
    const volunteerTask = await this.volunteerTaskModel.findById(id).exec();
    if (!volunteerTask) {
      throw new NotFoundException(`Volunteer task with ID ${id} not found`);
    }
    return volunteerTask;
  }

  // Cập nhật công việc tình nguyện theo ID
  async update(
    id: string,
    updateVolunteerTaskDto: UpdateVolunteerTaskDto,
  ): Promise<VolunteerTask> {
    const updatedVolunteerTask = await this.volunteerTaskModel
      .findByIdAndUpdate(id, updateVolunteerTaskDto, { new: true })
      .exec();
    if (!updatedVolunteerTask) {
      throw new NotFoundException(`Volunteer task with ID ${id} not found`);
    }
    return updatedVolunteerTask;
  }

  // Xóa công việc tình nguyện theo ID
  async remove(id: string): Promise<void> {
    const deletedVolunteerTask = await this.volunteerTaskModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedVolunteerTask) {
      throw new NotFoundException(`Volunteer task with ID ${id} not found`);
    }
  }
}
