import { IsString, IsNotEmpty } from "class-validator";
import { BaseErrorDto } from "./base-error.dto";

export class JSErrorDto extends BaseErrorDto {
	@IsNotEmpty()
	@IsString()
	paths!: string;

	@IsNotEmpty()
	@IsString()
	stack!: string;

	@IsString()
	functionName!: string;
}
