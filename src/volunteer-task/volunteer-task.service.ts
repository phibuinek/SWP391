import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateVolunteerTaskDto } from "./dto/create-volunteer-task.dto";
import { UpdateVolunteerTaskDto } from "./dto/update-volunteer-task.dto";
import {
  Status,
  VolunteerTask,
  VolunteerTaskDocument,
} from "./schemas/volunteer-task.schema";
import { User, UserDocument } from "src/auth/schemas/user.schema";
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class VolunteerTaskService {
  constructor(
    @InjectModel(VolunteerTask.name) private volunteerTaskModel: Model<VolunteerTaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  // Tạo mới một công việc tình nguyện
  async create(createVolunteerTaskDto: CreateVolunteerTaskDto,): Promise<VolunteerTask> {
    const volunteer = await this.userModel.findOne({ _id: createVolunteerTaskDto.assignedTo, role: Role.VOLUNTEER });
    if (!volunteer) {
      throw new NotFoundException(`Not Found Volunteer to assign task`);
    }
    const newVolunteerTask = new this.volunteerTaskModel(createVolunteerTaskDto);
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

  async updateTaskProcess(id: string, updateVolunteerTaskDto: UpdateVolunteerTaskDto): Promise<VolunteerTask> {
    if (updateVolunteerTaskDto.status === Status.IN_PROGRESS) {
      const volunteerTask = await this.volunteerTaskModel.findByIdAndUpdate(
        id,
        { status: Status.IN_PROGRESS },
        { new: true },
      );
      if(!volunteerTask){
        throw new NotFoundException(`You don't have any task`);
      }
      return volunteerTask;
    }
    if (updateVolunteerTaskDto.status === Status.COMPLETED) {
      const now = new Date();
      now.setHours(now.getHours() + 7);
      const volunteerTask = await this.volunteerTaskModel.findByIdAndUpdate(
        id,
        { status: Status.COMPLETED, completedDate: now },
        { new: true },
      );
      if(!volunteerTask){
        throw new NotFoundException(`You don't have any task`);
      }
      return volunteerTask;
    }
  }

  async findByAssignTo(id: string): Promise<VolunteerTask[]>{
    const volunteer = await this.userModel.findOne({_id: id});
    if(!volunteer){
      throw new NotFoundException(`You don't have permisson`);
    }
    const tasks = await this.volunteerTaskModel.find({assignedTo: id});
    if (!tasks){
      throw new NotFoundException(`You don't have any task`);
    }
    return tasks;
  }

  async findByAssignBy(id: string): Promise<VolunteerTask[]>{
    const tasks = await this.volunteerTaskModel.find({assignedBy: id});
    if(!tasks){
      throw new NotFoundException(`You have never assigned task to anyone`);
    }
    return tasks;
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
