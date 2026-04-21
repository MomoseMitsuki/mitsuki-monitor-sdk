import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ActionService } from "./action.service";
import { ActionDto } from "./dto/action.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

@Controller("report")
export class ActionController {
	constructor(private readonly actionService: ActionService) {}

	@Post("/action")
	reportData(@Body() body: ActionDto) {
		return this.actionService.reportData(body);
	}

	@Get("/action")
	async reportDataWithImg(@Query("data") data: string) {
		const dto = plainToInstance(ActionDto, JSON.parse(data));
		const errors = await validate(dto);
		if (errors.length > 0) {
			throw new BadRequestException("BadRequest: Invalid query parameters");
		}
		return this.actionService.reportData(dto);
	}
}
