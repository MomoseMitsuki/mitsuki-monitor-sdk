import { Body, Controller, Post } from "@nestjs/common";
import { ApiService } from "./api.service";
import { ApiDto } from "./dto/api.dto";

@Controller("report")
export class ApiController {
	constructor(private readonly apiService: ApiService) {}

	@Post("/api")
	reportData(@Body() body: ApiDto) {
		return this.apiService.reportData(body);
	}
}
