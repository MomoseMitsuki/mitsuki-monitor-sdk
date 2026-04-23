import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ReportModule } from "./report/report.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SourceGuardMiddleware } from "./middlewares/SourceGuard.middleware";
import path from "node:path";

@Module({
	imports: [
		ServeStaticModule.forRoot({
			serveRoot: "/",
			rootPath: path.resolve(__dirname, "../", "client")
		}),
		ReportModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.DATABASE_URL as string)
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(SourceGuardMiddleware);
	}
}
