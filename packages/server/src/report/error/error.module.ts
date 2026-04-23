import { Module } from "@nestjs/common";
import { ErrorSchema, Error } from "src/schema";
import { ErrorService } from "./error.service";
import { ErrorController } from "./error.controller";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [MongooseModule.forFeature([{ name: Error.name, schema: ErrorSchema }])],
	providers: [ErrorService],
	controllers: [ErrorController]
})
export class ErrorModule {}
