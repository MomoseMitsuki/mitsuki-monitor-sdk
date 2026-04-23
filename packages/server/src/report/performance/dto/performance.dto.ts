import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { BaseDto } from "src/shared/base.dto";

export class ReportPerformanceDto extends BaseDto {
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => PerformanceDto)
	data!: Array<PerformanceDto>;
}

class PerformanceDto {
	@IsString()
	name!: string;

	@IsNumber()
	value!: number;

	@IsString()
	rating!: string;

	@IsNumber()
	delta!: number;
}
