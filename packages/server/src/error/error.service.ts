import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { ReportErrorDto, ErrorDto, ResourceErrorDto } from "./dto/index.dto";
import { Error } from "src/schema";

@Injectable()
export class ErrorService {
	constructor(@InjectModel(Error.name) private errModal: Model<Error>) {}

	reportData(dto: ReportErrorDto) {
		const { id, appId, userId, data, currentTime, currentPage, ua } = dto;
		data.forEach(async item => {
			if (this.isResourceError(item)) {
				const errorLog = new this.errModal({
					id,
					appId,
					userId,
					filename: item.filename,
					errorType: item.errorType,
					errMsg: item.message,
					tagName: item.tagName,
					createTime: currentTime,
					currentPage,
					ua
				});
				await errorLog.save();
			} else {
				const errorLog = new this.errModal({
					id,
					appId,
					userId,
					errorType: item.errorType,
					errMsg: item.message,
					filename: item.filename,
					functionName: item.functionName,
					stack: item.stack,
					colno: item.colno,
					lineno: item.lineno,
					createTime: currentTime,
					currentPage,
					ua
				});
				await errorLog.save();
			}
		});
	}

	isResourceError(data: ErrorDto): data is ResourceErrorDto {
		return Object.is(data.errorType, "resourceError");
	}
}
