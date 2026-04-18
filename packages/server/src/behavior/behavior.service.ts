import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BehaviorDto } from "./dto/index.dto";
import { Behavior } from "src/schema";

@Injectable()
export class BehaviorService {
	constructor(@InjectModel(Behavior.name) private readonly behaviorModel: Model<Behavior>) {}

	reportData(dto: BehaviorDto) {
		const { id, appId, userId, data, currentTime, currentPage, ua } = dto;
		data.forEach(async item => {
			const behaviorLog = new this.behaviorModel({
				id,
				appId,
				userId,
				subType: item.subType,
				referrer: hasKey(item, "referrer"),
				effectiveType: hasKey(item, "effectiveType"),
				rtt: hasKey(item, "rtt"),
				stayTime: hasKey(item, "stayTime"),
				from: hasKey(item, "from"),
				to: hasKey(item, "to"),
				params: hasKey(item, "params"),
				query: hasKey(item, "query"),
				name: hasKey(item, "name"),
				createTime: currentTime,
				currentPage,
				ua
			});
			await behaviorLog.save();
		});
	}
}

function hasKey(obj: object, key: string) {
	return key in obj ? obj[key] : void 0;
}
