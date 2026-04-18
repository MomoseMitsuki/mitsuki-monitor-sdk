import { Body, Controller, Post } from "@nestjs/common";
import { ErrorService } from "./error.service";
import { ReportErrorDto } from "./dto/index.dto";

@Controller("report")
export class ErrorController {
	constructor(private readonly errorService: ErrorService) {}

	@Post("/error")
	reportData(@Body() body: ReportErrorDto) {
		return this.errorService.reportData(body);
	}
}
