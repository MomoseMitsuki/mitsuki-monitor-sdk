import { Controller } from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import { Body, Post } from "@nestjs/common";
import { ReportPerformanceDto } from "./dto/performance.dto";

@Controller("/report")
export class PerformanceController {
	constructor(private readonly performanceService: PerformanceService) {}

	@Post("/performance")
	reportData(@Body() dto: ReportPerformanceDto) {
		return this.performanceService.reportData(dto);
	}
}
