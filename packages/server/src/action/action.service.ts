import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ActionDto } from "./dto/action.dto";
import { UserAction } from "src/schema";

@Injectable()
export class ActionService {
	constructor(@InjectModel(UserAction.name) private readonly actionService: Model<UserAction>) {}

	reportData(dto: ActionDto) {
		const { id, appId, userId, username, data, currentTime, currentPage, ua } = dto;
		data.forEach(async item => {
			const actionLog = new this.actionService({
				id,
				appId,
				userId,
				username,
				eventType: item.eventType,
				tagName: item.tagName,
				value: item.value,
				paths: item.paths,
				x: item.x,
				y: item.y,
				createTime: currentTime,
				currentPage,
				ua
			});
			await actionLog.save();
		});
	}
}
