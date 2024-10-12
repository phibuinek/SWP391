import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";

@Controller("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    // Sửa lại kiểu của id thành string
    return this.feedbackService.findOne(id); // Không cần ép kiểu id
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(id, updateFeedbackDto); // Không cần ép kiểu id
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.feedbackService.remove(id); // Không cần ép kiểu id
  }
}
