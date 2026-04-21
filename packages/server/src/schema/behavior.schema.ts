import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BehaviorDocument = HydratedDocument<Behavior>;

@Schema()
export class Behavior {
	@Prop({ required: true, type: String })
	id!: string;

	@Prop({ required: true, type: String })
	appId!: string;

	@Prop({ required: true, type: String })
	userId!: string;

	@Prop({ required: true, type: String })
	username!: string;

	@Prop({ required: true, type: String })
	subType!: string;

	@Prop({ required: false, type: String })
	referrer?: string;

	@Prop({ required: false, type: String })
	effectiveType?: string;

	@Prop({ required: false, type: Number })
	rtt?: number;

	@Prop({ required: false, type: String })
	from?: string;

	@Prop({ required: false, type: String })
	to?: string;

	@Prop({ required: false, type: Object })
	params?: object;

	@Prop({ required: false, type: Object })
	query?: object;

	@Prop({ required: false, type: String })
	name?: string;

	@Prop({ required: false, type: Number })
	stayTime?: number;

	@Prop({ required: true, type: Number })
	createTime!: number;

	@Prop({ required: true, type: String })
	currentPage!: string;

	@Prop({ required: true })
	ua!: string;
}

export const BehaviorSchema = SchemaFactory.createForClass(Behavior);
