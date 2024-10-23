import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body() paymentDto: { amount: number; currency: string; orderId: string },
  ) {
    return this.paymentService.createPayment(
      paymentDto.amount,
      paymentDto.currency,
      paymentDto.orderId,
    );
  }
}
