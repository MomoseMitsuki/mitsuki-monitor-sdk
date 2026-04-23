import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AppLogDocument = HydratedDocument<AppLog>;

@Schema()
export class AppLog {
	@Prop({ required: true, type: String })
	appId!: string;

	@Prop({ required: true, type: String })
	name!: string;
}

export const AppLogSchema = SchemaFactory.createForClass(AppLog);
