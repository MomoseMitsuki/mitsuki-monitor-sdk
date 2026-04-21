import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import { ReportPerformanceDto } from "./dto/performance.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

@Controller("/report")
export class PerformanceController {
	constructor(private readonly performanceService: PerformanceService) {}

	@Post("/performance")
	reportData(@Body() dto: ReportPerformanceDto) {
		return this.performanceService.reportData(dto);
	}

	@Get("/performance")
	async reportDataWithImg(@Query("data") data: string) {
		const dto = plainToInstance(ReportPerformanceDto, JSON.parse(data));
		const errors = await validate(dto);
		if (errors.length > 0) {
			throw new BadRequestException("BadRequest: Invalid query parameters");
		}
		return this.performanceService.reportData(dto);
	}
}
