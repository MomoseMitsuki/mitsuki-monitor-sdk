import { IsString, IsNumber, IsNotEmpty, IsObject } from "class-validator";

export class RouterChangeDto {
	@IsNotEmpty()
	@IsString()
	subType!: string;

	@IsNotEmpty()
	@IsObject()
	params!: object;

	@IsNotEmpty()
	@IsObject()
	query!: object;

	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsString()
	from!: string;

	@IsNotEmpty()
	@IsString()
	to!: string;

	@IsNotEmpty()
	@IsNumber()
	stayTime!: number;
}
