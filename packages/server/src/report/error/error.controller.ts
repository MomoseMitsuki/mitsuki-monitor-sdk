import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ErrorService } from "./error.service";
import { ReportErrorDto } from "./dto/index.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

@Controller("/report")
export class ErrorController {
	constructor(private readonly errorService: ErrorService) {}

	@Post("/error")
	reportData(@Body() body: ReportErrorDto) {
		return this.errorService.reportData(body);
	}

	@Get("/error")
	async reportDataWithImg(@Query("data") data: string) {
		const dto = plainToInstance(ReportErrorDto, JSON.parse(data));
		const errors = await validate(dto);
		if (errors.length > 0) {
			throw new BadRequestException("BadRequest: Invalid query parameters");
		}
		return this.errorService.reportData(dto);
	}
}
