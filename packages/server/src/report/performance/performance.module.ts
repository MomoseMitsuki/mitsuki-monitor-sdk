import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PerformanceController } from "./performance.controller";
import { PerformanceService } from "./performance.service";
import { PerformanceSchema, Performance } from "src/schema";

@Module({
	imports: [MongooseModule.forFeature([{ name: Performance.name, schema: PerformanceSchema }])],
	providers: [PerformanceService],
	controllers: [PerformanceController]
})
export class PerformanceModule {}
