import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { UserActionSchema, UserAction } from "src/schema";

@Module({
	imports: [MongooseModule.forFeature([{ name: UserAction.name, schema: UserActionSchema }])],
	providers: [ActionService],
	controllers: [ActionController]
})
export class ActionModule {}
