import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PetModule } from "./pet/pet.module";
import { UserModule } from "./user/user.module";
import { User, UserSchema } from "./auth/schemas/user.schema";
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from "@typegoose/auto-increment";
import { ShelterModule } from "./shelter/shelter.module";
import { HealthCheckModule } from "./health-check/health-check.module";
import { AdoptionRequestModule } from "./adoption-request/adoption-request.module";
import { PaymentService } from "./payment/payment.service";
import { PaymentController } from "./payment/payment.controller";
import { PaymentModule } from "./payment/payment.module";
import { NotificationGateway } from "./notification/notification.gateway";
import { NotificationService } from "./notification/notification.service";
import { NotificationController } from "./notification/notification.controller";
import { NotificationModule } from "./notification/notification.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema.plugin(AutoIncrementID, {
          field: "id",
          startAt: 1,
        } satisfies AutoIncrementIDOptions),
      },
    ]),
    AuthModule,
    PetModule,
    UserModule,
    ShelterModule,
    HealthCheckModule,
    AdoptionRequestModule,
    PaymentModule,
    NotificationModule,
  ],
  controllers: [AppController, PaymentController, NotificationController],
  providers: [
    AppService,
    PaymentService,
    NotificationGateway,
    NotificationService,
  ],
})
export class AppModule {}
