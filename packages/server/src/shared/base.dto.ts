import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class BaseDto {
	@IsNotEmpty()
	@IsString()
	id!: string;

	@IsNotEmpty()
	@IsString()
	appId!: string;

	@IsNotEmpty()
	@IsString()
	userId!: string;

	@IsNotEmpty()
	@IsString()
	ua!: string;

	@IsNotEmpty()
	@IsString()
	type!: string;

	@IsNotEmpty()
	@IsNumber()
	currentTime!: number;

	@IsNotEmpty()
	@IsString()
	currentPage!: string;
}
