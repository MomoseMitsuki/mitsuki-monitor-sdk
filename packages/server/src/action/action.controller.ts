import { Body, Controller, Post } from "@nestjs/common";
import { ActionService } from "./action.service";
import { ActionDto } from "./dto/action.dto";

@Controller("report")
export class ActionController {
	constructor(private readonly actionService: ActionService) {}

	@Post("/action")
	reportData(@Body() body: ActionDto) {
		return this.actionService.reportData(body);
	}
}
