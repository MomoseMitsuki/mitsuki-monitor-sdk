import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";
import { BehaviorService } from "./behavior.service";
import { BehaviorDto } from "./dto/index.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

@Controller("report")
export class BehaviorController {
	constructor(private readonly behaviorService: BehaviorService) {}

	@Post("/behavior")
	reportData(@Body() body: BehaviorDto) {
		return this.behaviorService.reportData(body);
	}
	@Get("/behavior")
	async reportDataWithImg(@Query("data") data: string) {
		const dto = plainToInstance(BehaviorDto, JSON.parse(data));
		const errors = await validate(dto);
		if (errors.length > 0) {
			throw new BadRequestException("BadRequest: Invalid query parameters");
		}
		return this.behaviorService.reportData(dto);
	}
}
