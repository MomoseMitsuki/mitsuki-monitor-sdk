import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, BadRequestException, Logger } from "@nestjs/common";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationError } from "class-validator";

const logger = new Logger("Validation");

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ["error", "warn"]
	});
	app.enableCors();
	app.useBodyParser("text");
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			exceptionFactory: errors => {
				const messages = formatErrors(errors);

				logger.warn(`DTO 校验失败:\n${messages.join("\n")}`);

				return new BadRequestException(messages);
			}
		})
	);
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

function formatErrors(errors: ValidationError[], parent = ""): string[] {
	const result: string[] = [];

	for (const err of errors) {
		const path = parent ? `${parent}.${err.property}` : err.property;

		if (err.constraints) {
			for (const msg of Object.values(err.constraints)) {
				result.push(`${path}: ${msg}`);
			}
		}

		if (err.children?.length) {
			result.push(...formatErrors(err.children, path));
		}
	}

	return result;
}
