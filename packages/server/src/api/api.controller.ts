import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiService } from "./api.service";
import { ApiDto } from "./dto/api.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

@Controller("report")
export class ApiController {
	constructor(private readonly apiService: ApiService) {}

	@Post("/api")
	reportData(@Body() body: ApiDto) {
		return this.apiService.reportData(body);
	}

	@Get("/api")
	async reportDataWithImg(@Query("data") data: string) {
		const dto = plainToInstance(ApiDto, JSON.parse(data));
		const errors = await validate(dto);
		if (errors.length > 0) {
			throw new BadRequestException("BadRequest: Invalid query parameters");
		}
		return this.apiService.reportData(dto);
	}
}
