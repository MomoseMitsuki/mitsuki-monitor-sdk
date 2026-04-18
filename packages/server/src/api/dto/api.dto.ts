import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { BaseDto } from "src/shared/base.dto";

class ReportApiDto {
	@IsNotEmpty()
	@IsString()
	subType!: string;

	@IsNotEmpty()
	@IsNumber()
	startTime!: number;

	@IsNotEmpty()
	@IsNumber()
	endTime!: number;

	@IsNotEmpty()
	@IsNumber()
	duration!: number;

	@IsNotEmpty()
	@IsString()
	url!: string;

	@IsNotEmpty()
	@IsString()
	method!: string;

	@IsNotEmpty()
	@IsNumber()
	status!: number;

	@IsBoolean()
	success!: boolean;
}

export class ApiDto extends BaseDto {
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ReportApiDto)
	data!: Array<ReportApiDto>;
}
