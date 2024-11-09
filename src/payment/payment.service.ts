import { Injectable, NotFoundException } from "@nestjs/common";
import axios from "axios";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as crypto from "crypto";
import {
  Transaction,
  TransactionDocument,
  TransactionType,
  TransactionStatus,
} from "./schemas/transactiton.schema";

@Injectable()
export class PaymentService {
  private readonly payosUrl = "http://localhost:8000/payment";
  private readonly clientId = "4fccefd6-7c26-473e-98b0-e6afac8933e3";
  private readonly apiKey = "e93830e9-2031-4567-bc45-d1c419c99d5e";
  private readonly checksumKey =
    "b76592bbf1c4ddee71846c10a6da2ed7c78851db8ad7a544801a96758333324b";

  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  // Gộp thành một method duy nhất xử lý cả việc tạo payment link và lưu transaction
  async createPayOSPaymentLink(paymentData: any) {
    try {
      console.log("Creating PayOS payment with data:", paymentData);

      // 1. Validate dữ liệu
      if (!paymentData.userId || !paymentData.amount) {
        throw new Error(
          "Missing required fields: userId and amount are required",
        );
      }

      // 2. Tạo orderCode cho PayOS
      const orderCode = Math.floor(Math.random() * 1000000000);

      // 3. Lưu transaction vào MongoDB
      const transaction = new this.transactionModel({
        userId: paymentData.userId,
        amount: Number(paymentData.amount),
        currency: "VND",
        type: TransactionType.DONATION,
        status: TransactionStatus.COMPLETED,
        description: paymentData.description || "Donation to PawFund",
        paymentMethod: "PayOS",
        paymentId: orderCode.toString(), // Dùng orderCode làm paymentId
      });

      console.log("Saving transaction:", transaction);
      const savedTransaction = await transaction.save();
      console.log("Transaction saved successfully:", savedTransaction);

      // 4. Tạo payment link với PayOS
      const checksum = this.generateChecksum({
        amount: paymentData.amount,
        orderCode,
        clientId: this.clientId,
      });

      const response = await axios.post(
        `${this.payosUrl}`,
        {
          amount: paymentData.amount,
          orderCode,
          clientId: this.clientId,
          checksum,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      console.log("PayOS response:", response.data);

      // 5. Trả về kết quả
      return {
        ...response.data,
        transactionId: savedTransaction._id,
        paymentId: orderCode.toString(),
      };
    } catch (error) {
      console.error("Error in createPayOSPaymentLink:", error);
      throw new Error(`Failed to process payment: ${error.message}`);
    }
  }

  // Method để lấy lịch sử giao dịch
  async getUserTransactionHistory(userId: string): Promise<Transaction[]> {
    try {
      console.log("Getting transaction history for user:", userId);

      const transactions = await this.transactionModel
        .find({
          userId: userId,
          status: TransactionStatus.COMPLETED, // Chỉ lấy các giao dịch COMPLETED
        })
        .sort({ createdAt: -1 })
        .exec();

      console.log("Found transactions:", transactions);
      return transactions || [];
    } catch (error) {
      console.error("Error getting transaction history:", error);
      return [];
    }
  }

  private generateChecksum(data: any): string {
    const hash = crypto.createHmac("sha256", this.checksumKey);
    hash.update(JSON.stringify(data));
    return hash.digest("hex");
  }

  // Method để verify webhook signature
  verifyWebhookSignature(webhookData: any): boolean {
    try {
      // Implement PayOS webhook signature verification here
      return true; // Temporary return true for testing
    } catch (error) {
      console.error("Webhook verification error:", error);
      return false;
    }
  }
}
