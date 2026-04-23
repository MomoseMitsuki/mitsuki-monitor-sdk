import { IsString, IsNotEmpty } from "class-validator";
import { BaseErrorDto } from "./base-error.dto";

export class ResourceErrorDto extends BaseErrorDto {
	@IsNotEmpty()
	@IsString()
	tagName!: string;
}
