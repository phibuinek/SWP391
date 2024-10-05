import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HealthCheck, HealthCheckDocument } from './schemas/health-check.schema';
import { Model } from 'mongoose';
import { CreateHealthCheckDto } from './dto/create-health-check.dto';

@Injectable()
export class HealthCheckService {
  constructor(
    @InjectModel(HealthCheck.name) private readonly healthCheckModel: Model<HealthCheckDocument>,
  ) { }

  async createHealthCheck(createHealthCheckDto: CreateHealthCheckDto) {
    const newHealthCheck = new this.healthCheckModel(createHealthCheckDto);
    return newHealthCheck.save();
  }
  async viewHealthChecksByPetId(petId: string): Promise<HealthCheck[]> {
    const healthChecks = await this.healthCheckModel.find({ petId }).exec();
    
    if (!healthChecks.length) {
        throw new NotFoundException(`No health checks found for pet with ID ${petId}`);
    }

    return healthChecks;
}
}
