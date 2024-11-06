import { Injectable, NotFoundException } from "@nestjs/common";
import axios from "axios";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from "crypto";
import { Transaction, TransactionDocument, TransactionType, TransactionStatus } from '../payment/schemas/transactiton.schema';

@Injectable()
export class PaymentService {
  private readonly payosUrl = "http://localhost:8000/payment";
  private readonly clientId = "4fccefd6-7c26-473e-98b0-e6afac8933e3";
  private readonly apiKey = "e93830e9-2031-4567-bc45-d1c419c99d5e";
  private readonly checksumKey = "b76592bbf1c4ddee71846c10a6da2ed7c78851db8ad7a544801a96758333324b";

  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
  ) {}

  async createPayment(amount: number, currency: string, orderId: string, userId: string) {
    const paymentData = {
      amount,
      currency,
      orderId,
      clientId: this.clientId,
    };
  
    const checksum = this.generateChecksum(paymentData);
  
    try {
      const response = await axios.post(
        `${this.payosUrl}`,
        {
          ...paymentData,
          checksum,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );
  
      // Lưu thông tin giao dịch vào cơ sở dữ liệu
      const transaction = new this.transactionModel({
        userId: userId,
        amount: amount,
        currency: currency,
        type: TransactionType.DONATION, // Hoặc loại giao dịch tương ứng
        status: TransactionStatus.COMPLETED, // Hoặc trạng thái tương ứng
        description: `Payment for order ID: ${orderId}`,
        paymentMethod: 'PayOS', // Phương thức thanh toán
        paymentId: response.data.paymentId, // Giả sử bạn nhận được paymentId từ phản hồi
      });
  
      await transaction.save();
  
      return response.data;
    } catch (error) {
      throw new Error(`Payment error: ${error.message}`);
    }
  }

  private generateChecksum(data: any): string {
    const hash = crypto.createHmac("sha256", this.checksumKey);
    hash.update(JSON.stringify(data));
    return hash.digest("hex");
  }

  verifyPaymentWebhookData(data: any) {
    // Implement your verification logic here
    // Return verified data
    return data; // Replace with actual verification result
  }

  async getUserTransactionHistory(userId: string): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find({ userId: userId })
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian gần nhất
      .exec();

    if (!transactions || transactions.length === 0) {
      throw new NotFoundException(`No transactions found for user with id ${userId}`);
    }

    return transactions;
  }
}