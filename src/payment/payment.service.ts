import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as crypto from "crypto";

@Injectable()
export class PaymentService {
  private readonly payosUrl = "http://localhost:8000/payment";
  private readonly clientId = "4fccefd6-7c26-473e-98b0-e6afac8933e3";
  private readonly apiKey = "e93830e9-2031-4567-bc45-d1c419c99d5e";
  private readonly checksumKey =
    "b76592bbf1c4ddee71846c10a6da2ed7c78851db8ad7a544801a96758333324b";

    async createPayment(amount: number, currency: string, orderId: string) {
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
}
