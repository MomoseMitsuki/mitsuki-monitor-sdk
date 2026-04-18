import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserActionDocument = HydratedDocument<UserAction>;

@Schema()
export class UserAction {
	@Prop({ required: true, type: String })
	id!: string;

	@Prop({ required: true, type: String })
	appId!: string;

	@Prop({ required: true, type: String })
	userId!: string;

	@Prop({ required: false, type: String })
	eventType?: string;

	@Prop({ required: false, type: String })
	tagName?: string;

	@Prop({ required: false, type: String })
	value?: string;

	@Prop({ required: false, type: String })
	timeStamp?: string;

	@Prop({ required: false, type: String })
	paths?: string;

	@Prop({ required: false, type: Number })
	x?: number;

	@Prop({ required: false, type: Number })
	y?: number;

	@Prop({ required: false, type: String })
	currentPage?: string;

	@Prop({ required: true, type: Number })
	createTime!: number;

	@Prop({ required: true, type: String })
	ua!: string;
}

export const UserActionSchema = SchemaFactory.createForClass(UserAction);
