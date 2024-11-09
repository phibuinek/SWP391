import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // API endpoint để tạo PayOS payment link và lưu transaction
  @Post("create-payos-link")
  async createPayOSLink(@Body() paymentData: any) {
    try {
      console.log("Creating PayOS link with data:", paymentData);

      // Validate required fields
      if (!paymentData.amount || !paymentData.userId) {
        throw new BadRequestException("Amount and userId are required");
      }

      // Gọi service để xử lý (tạo payment link và lưu transaction)
      const result =
        await this.paymentService.createPayOSPaymentLink(paymentData);
      console.log("PayOS link created with transaction:", result);

      return {
        error: 0,
        message: "PayOS link created and transaction saved successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error in createPayOSLink:", error);
      throw new HttpException(
        {
          error: -1,
          message: error.message || "Failed to create PayOS link",
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // API endpoint để xử lý webhook từ PayOS
  @Post("webhook")
  async handlePaymentWebhook(@Body() webhookData: any) {
    try {
      console.log("Received webhook data:", webhookData);

      // Verify webhook signature
      const isValid = this.paymentService.verifyWebhookSignature(webhookData);
      if (!isValid) {
        throw new BadRequestException("Invalid webhook signature");
      }

      // Webhook chỉ dùng để verify payment status
      // Transaction đã được lưu khi tạo payment link
      if (webhookData.status === "PAID") {
        return {
          error: 0,
          message: "Payment verified successfully",
          data: webhookData,
        };
      }

      return {
        error: 0,
        message: `Payment status: ${webhookData.status}`,
        data: null,
      };
    } catch (error) {
      console.error("Webhook processing error:", error);
      throw new HttpException(
        {
          error: -1,
          message: error.message || "Failed to process payment webhook",
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // API endpoint để lấy lịch sử giao dịch thành công
  @Get("history/:userId")
  async getUserTransactionHistory(@Param("userId") userId: string) {
    try {
      console.log("Getting transaction history for user:", userId);

      if (!userId) {
        throw new BadRequestException("User ID is required");
      }

      const transactions =
        await this.paymentService.getUserTransactionHistory(userId);
      console.log("Found transactions:", transactions);

      return {
        error: 0,
        message:
          transactions.length > 0
            ? "Transaction history retrieved successfully"
            : "No transactions found",
        data: transactions,
      };
    } catch (error) {
      console.error("Error getting transaction history:", error);
      throw new HttpException(
        {
          error: -1,
          message: error.message || "Failed to get transaction history",
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
