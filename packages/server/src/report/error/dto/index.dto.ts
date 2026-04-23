import { ResourceErrorDto } from "./resource-error.dto";
import { JSErrorDto } from "./js-error.dto";
import { BaseErrorDto } from "./base-error.dto";
import { IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { BaseDto } from "src/shared/base.dto";

export * from "./resource-error.dto";
export * from "./js-error.dto";
export type ErrorDto = ResourceErrorDto | JSErrorDto;

export class ReportErrorDto extends BaseDto {
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => BaseErrorDto, {
		discriminator: {
			property: "errorType",
			subTypes: [
				{ value: JSErrorDto, name: "jsError" },
				{ value: JSErrorDto, name: "promiseError" },
				{ value: JSErrorDto, name: "vueError" },
				{ value: JSErrorDto, name: "reactError" },
				{ value: ResourceErrorDto, name: "resourceError" }
			]
		},
		keepDiscriminatorProperty: true
	})
	data!: Array<ErrorDto>;
}
