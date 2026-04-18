import { Body, Controller, Post } from "@nestjs/common";
import { BehaviorService } from "./behavior.service";
import { BehaviorDto } from "./dto/index.dto";

@Controller("report")
export class BehaviorController {
	constructor(private readonly behaviorService: BehaviorService) {}

	@Post("/behavior")
	reportData(@Body() body: BehaviorDto) {
		return this.behaviorService.reportData(body);
	}
}
