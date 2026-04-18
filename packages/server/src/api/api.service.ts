import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiDto } from "./dto/api.dto";
import { ApiLog } from "src/schema";

@Injectable()
export class ApiService {
	constructor(@InjectModel(ApiLog.name) private readonly apiModel: Model<ApiLog>) {}

	reportData(dto: ApiDto) {
		const { id, appId, userId, data, currentTime, currentPage, ua } = dto;
		data.forEach(async item => {
			const apiLog = new this.apiModel({
				id,
				appId,
				userId,
				subType: item.subType,
				startTime: item.startTime,
				duration: item.duration,
				endTime: item.endTime,
				url: item.url,
				method: item.method,
				success: item.success,
				createTime: currentTime,
				currentPage,
				ua
			});
			await apiLog.save();
		});
	}
}
