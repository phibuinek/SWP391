import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsInt,
  IsBoolean,
  IsEnum,
  IsDate,
  IsNumber,
  IsOptional,
  Length,
  Max,
  Min,
  Matches,
} from "class-validator";

// Định nghĩa Enum cho DeliveryStatus
export enum DeliveryStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

// Định nghĩa Enum cho PetStatus
export enum PetStatus {
  AVAILABLE = "AVAILABLE",
  ADOPTED = "ADOPTED",
  LOST = "LOST",
  PENDING = "PENDING",
}

export class CreatePetDto {
  @ApiProperty({
    description: "ID của Pet",
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: "ID của shelter",
    example: 101,
  })
  @IsInt()
  shelterId: number;

  @ApiProperty({
    description: "Mã của thú cưng",
    example: "PET12345",
  })
  @IsString()
  @Length(4, 20)
  @Matches(/^PET\d+$/, {
    message: 'petCode must start with "PET" followed by numbers',
  })
  petCode: string;

  @ApiProperty({
    description: "Tên của thú cưng",
    example: "Fluffy",
  })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    description: "Mô tả về thú cưng (nếu có)",
    example: "A friendly dog",
    required: false, // Vì đây là trường tùy chọn
  })
  @IsString()
  @IsOptional() // Cho phép thuộc tính này không bắt buộc
  description?: string;

  @ApiProperty({
    description: "URL của hình ảnh thú cưng (nếu có)",
    example: "https://example.com/image.jpg",
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: "Màu sắc của thú cưng (nếu có)",
    example: "Brown",
    required: false,
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    description: "Giống loài của thú cưng",
    example: "Golden Retriever",
  })
  @IsString()
  breed: string;

  @ApiProperty({
    description: "Tuổi của thú cưng",
    example: 3,
    minimum: 0,
    maximum: 30,
  })
  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @ApiProperty({
    description: "Loài của thú cưng (1: Chó, 2: Mèo)",
    example: 1,
  })
  @IsInt()
  species: number;

  @ApiProperty({
    description: "Thú cưng đã được tiêm phòng chưa",
    example: true,
  })
  @IsBoolean()
  isVacinted: boolean;

  @ApiProperty({
    description: "Thú cưng đã được xác minh chưa",
    example: true,
  })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({
    description: "Trạng thái giao hàng của thú cưng",
    example: "PENDING",
    enum: DeliveryStatus,
  })
  @IsEnum(DeliveryStatus)
  deliveryStatus: DeliveryStatus;

  @ApiProperty({
    description: "Thú cưng đã được nhận nuôi chưa",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isAdopted: boolean;

  @ApiProperty({
    description: "Ghi chú thêm về thú cưng (nếu có)",
    example: "Rescued from a busy street",
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;

  @IsDate()
  @IsOptional()
  rescueDate: Date;

  @ApiProperty({
    description: "ID của người đã cứu hộ thú cưng",
    example: 205,
  })
  @IsInt()
  rescueBy: number;

  @ApiProperty({
    description: "Phí cứu hộ",
    example: 150.5,
  })
  @IsNumber()
  rescueFee: number;

  @ApiProperty({
    description: "Địa điểm tìm thấy thú cưng",
    example: "Central Park, New York",
  })
  @IsString()
  locationFound: string;

  @ApiProperty({
    description: "Trạng thái hiện tại của thú cưng",
    example: "AVAILABLE",
    enum: PetStatus,
  })
  @IsOptional()
  @IsEnum(PetStatus)
  petStatus: PetStatus;
}
