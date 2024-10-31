import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('feedback')
@Controller("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post("create")
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get("view-all")
  async findAll() {
    return this.feedbackService.findAll();
  }

  @Get("find-one/:id")
  async findOne(@Param("id") id: string) {
    return this.feedbackService.findOne(id);
  }

  @Get("view-by-pet/:petId")
  async findByPetId(@Param("petId") petId: string) {
    return this.feedbackService.findByPetId(petId);
  }

  @Get("view-by-user/:userId")
  async findByUserId(@Param("userId") userId: string) {
    return this.feedbackService.findByUserId(userId);
  }

  @Put("update/:id")
  async update(
    @Param("id") id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(id, updateFeedbackDto);
  }

  @Delete("delete/:id")
  async remove(@Param("id") id: string) {
    return this.feedbackService.remove(id);
  }
}