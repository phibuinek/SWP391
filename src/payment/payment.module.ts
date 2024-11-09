import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import {
  Transaction,
  TransactionSchema,
} from "../payment/schemas/transactiton.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [MongooseModule],
})
export class PaymentModule {}
