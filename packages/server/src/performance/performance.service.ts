import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Performance } from "src/schema";
import { ReportPerformanceDto } from "./dto/performance.dto";

@Injectable()
export class PerformanceService {
	constructor(@InjectModel(Performance.name) private readonly performanceModel: Model<Performance>) {}

	reportData(dto: ReportPerformanceDto) {
		const { id, appId, userId, username, data, currentTime, currentPage, ua } = dto;
		data.forEach(async item => {
			const performanceLog = new this.performanceModel({
				id,
				appId,
				userId,
				username,
				name: item.name,
				value: item.value,
				rating: item.rating,
				delta: item.delta,
				createTime: currentTime,
				currentPage,
				ua
			});
			await performanceLog.save();
		});
	}
}
