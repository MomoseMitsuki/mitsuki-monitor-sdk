import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";
import { ApiLog, ApiLogSchema } from "src/schema";

@Module({
	imports: [MongooseModule.forFeature([{ name: ApiLog.name, schema: ApiLogSchema }])],
	providers: [ApiService],
	controllers: [ApiController]
})
export class ApiModule {}
