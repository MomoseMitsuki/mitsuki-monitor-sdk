import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ApiLogDocument = HydratedDocument<ApiLog>;

@Schema()
export class ApiLog {
	@Prop({ required: true, type: String })
	id!: string;

	@Prop({ required: true, type: String })
	appId!: string;

	@Prop({ required: true, type: String })
	userId!: string;

	@Prop({ required: true, type: String })
	subType!: string;

	@Prop({ required: false, type: Number })
	duration?: number;

	@Prop({ required: false, type: Number })
	startTime?: number;

	@Prop({ required: false, type: Number })
	endTime?: number;

	@Prop({ required: false, type: String })
	url?: string;

	@Prop({ required: false, type: String })
	method?: string;

	@Prop({ required: false, type: String })
	success?: string;

	@Prop({ required: true, type: Number })
	createTime!: number;

	@Prop({ required: true, type: String })
	currentPage!: string;

	@Prop({ required: true, type: String })
	ua!: string;
}

export const ApiLogSchema = SchemaFactory.createForClass(ApiLog);
