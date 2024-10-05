  import { IsString, IsNumber, IsOptional, IsEnum, IsNotEmpty, IsDate } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { HealthStatus } from '../enums/health-status.enum';
  import { CheckingType } from '../enums/checking-type.enum';
  import { Type } from 'class-transformer';

  export class CreateHealthCheckDto {
    @IsString()
    @IsOptional()
    petId: string;

    @ApiProperty({ example: HealthStatus.HEALTHY })
    @IsEnum(HealthStatus)
    healthStatus: HealthStatus;

    @ApiProperty({ example: 'The pet is in good health.' })
    @IsOptional()
    @IsString()
    healthStatusDescription?: string;

    @ApiProperty({ example: 'No notable issues.' })
    @IsOptional()
    @IsString()
    note?: string;

    @ApiProperty({ example: 15.5 })
    @IsOptional()
    @IsNumber()
    weight?: number;

    @ApiProperty({ example: 38.5 })
    @IsOptional()
    @IsNumber()
    temperature?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date) //
    @ApiProperty({ example: '2024-10-03T12:00:00Z' }) 
    checkingDate: Date;
    
    @ApiProperty({ example: '60e6b8e2f1a2b93f68f87c6d' })
    @IsString()
    checkingBy: string;

    @ApiProperty({ example: CheckingType.INITIAL })
    @IsEnum(CheckingType)
    checkingType?: CheckingType;

    @ApiProperty({ example: false })
    @IsOptional()
    isOld?: boolean;
  }
