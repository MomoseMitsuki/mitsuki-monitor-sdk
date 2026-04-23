import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ErrorModule } from "./error/error.module";
import { PerformanceModule } from "./performance/performance.module";
import { BehaviorModule } from "./behavior/behavior.module";
import { ActionModule } from "./action/action.module";
import { ApiModule } from "./api/api.module";
import { BeaconMiddleware } from "../middlewares/Beacon.middleware";

@Module({
	imports: [ErrorModule, PerformanceModule, BehaviorModule, ActionModule, ApiModule],
	controllers: [],
	providers: []
})
export class ReportModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		const routes = ["action", "api", "behavior", "error", "performance"];
		for (const route of routes) {
			consumer.apply(BeaconMiddleware).forRoutes({
				path: `/report/${route}`,
				method: RequestMethod.POST
			});
		}
	}
}
