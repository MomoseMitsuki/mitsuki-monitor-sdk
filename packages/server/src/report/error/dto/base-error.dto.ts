import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class BaseErrorDto {
	@IsNotEmpty()
	@IsString()
	errorType!: string;

	@IsString()
	@IsNotEmpty()
	filename!: string;

	@IsOptional()
	lineno?: number;

	@IsOptional()
	colno?: number;

	@IsString()
	message!: string;
}
