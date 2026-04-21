import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ErrorDocument = HydratedDocument<Error>;

@Schema()
export class Error {
	@Prop({ required: true, type: String })
	id!: string;

	@Prop({ required: true, type: String })
	appId!: string;

	@Prop({ required: true, type: String })
	userId!: string;

	@Prop({ required: true, type: String })
	username!: string;

	@Prop({ required: false, type: String })
	errorType?: string;

	@Prop({ default: "", type: String })
	errMsg!: string;

	@Prop({ default: "", type: String })
	stack!: string;

	@Prop({ default: "", type: String })
	filename!: string;

	@Prop({ default: "", type: String })
	functionName!: string;

	@Prop({ default: "", type: String })
	tagName!: string;

	@Prop({ required: false, type: Number })
	colno?: number;

	@Prop({ required: false, type: Number })
	lineno?: number;

	@Prop({ required: false, type: String })
	currentPage?: string;

	@Prop({ required: true, type: Number })
	createTime!: number;

	@Prop({ required: true, type: String })
	ua!: string;
}

export const ErrorSchema = SchemaFactory.createForClass(Error);
