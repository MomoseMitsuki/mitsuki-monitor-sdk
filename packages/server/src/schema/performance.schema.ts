import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PerformanceDocument = HydratedDocument<Performance>;

@Schema()
export class Performance {
	@Prop({ required: true, type: String })
	id!: string;

	@Prop({ required: true, type: String })
	appId!: string;

	@Prop({ required: true, type: String })
	userId!: string;

	@Prop({ default: "", type: String })
	name!: string;

	@Prop({ required: false, type: Number })
	value?: number;

	@Prop({ default: "good", type: String })
	rating!: string;

	@Prop({ required: false, type: Number })
	delta?: number;

	@Prop({ required: false, type: String })
	currentPage?: string;

	@Prop({ required: true, type: Number })
	createTime!: number;

	@Prop({ required: true, type: String })
	ua!: string;
}

export const PerformanceSchema = SchemaFactory.createForClass(Performance);
