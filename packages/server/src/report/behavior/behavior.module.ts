import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BehaviorController } from "./behavior.controller";
import { BehaviorService } from "./behavior.service";
import { BehaviorSchema, Behavior } from "src/schema";

@Module({
	imports: [MongooseModule.forFeature([{ name: Behavior.name, schema: BehaviorSchema }])],
	providers: [BehaviorService],
	controllers: [BehaviorController]
})
export class BehaviorModule {}
