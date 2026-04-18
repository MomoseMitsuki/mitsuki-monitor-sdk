import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ErrorModule } from "./error/error.module";
import { PerformanceModule } from "./performance/performance.module";
import { BehaviorModule } from "./behavior/behavior.module";
import { ActionModule } from "./action/action.module";
import { ApiModule } from "./api/api.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BeaconMiddleware } from "./middlewares/Beacon.middleware";

@Module({
	imports: [
		ErrorModule,
		PerformanceModule,
		BehaviorModule,
		ActionModule,
		ApiModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.DATABASE_URL as string)
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		const routes = ["error", "performance", "action", "behavior", "api"];
		for (const route of routes) {
			consumer.apply(BeaconMiddleware).forRoutes({
				path: `/report/${route}`,
				method: RequestMethod.POST
			});
		}
	}
}
