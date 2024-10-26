import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async handlePaymentWebhook(@Body() paymentData: { amount: number; currency: string; orderId: string; clientId: string }) {
    console.log("Payment handler", paymentData);

    // Bạn có thể xác minh và sử dụng thông tin từ paymentData
    const verifiedData = this.paymentService.verifyPaymentWebhookData(paymentData);

    // Kiểm tra thông tin
    if (["Ma giao dich thu nghiem", "VQRIO123"].includes(verifiedData.description)) {
      return {
        error: 0,
        message: "Ok",
        data: verifiedData,
      };
    }

    return {
      error: 0,
      message: "Ok",
      data: verifiedData,
    };
  }
}

