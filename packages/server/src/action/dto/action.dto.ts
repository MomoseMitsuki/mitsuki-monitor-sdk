import { Type } from "class-transformer";
import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { BaseDto } from "src/shared/base.dto";

export class ReportActionDto {
	@IsNotEmpty()
	@IsString()
	eventType!: string;

	@IsNotEmpty()
	@IsString()
	tagName!: string;

	@IsNotEmpty()
	@IsNumber()
	x!: number;

	@IsNotEmpty()
	@IsNumber()
	y!: number;

	@IsNotEmpty()
	@IsString()
	paths!: string;

	@IsNotEmpty()
	value!: string;
}

export class ActionDto extends BaseDto {
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ReportActionDto)
	data!: Array<ReportActionDto>;
}
