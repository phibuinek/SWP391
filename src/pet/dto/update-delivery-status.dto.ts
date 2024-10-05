import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { DeliveryStatus } from "../enums/delivery-status.enum";

export class UpdateDeliveryStatusDTO {
  @IsEnum(DeliveryStatus)
  @ApiProperty({
    example: "COMPLETED",
  })
  deliveryStatus: DeliveryStatus;
}
