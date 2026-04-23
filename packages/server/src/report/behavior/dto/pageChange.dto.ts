import { Equals, IsString, IsNumber, IsNotEmpty } from "class-validator";

export class PageChangeDto {
	@IsNotEmpty()
	@Equals("pageChange")
	subType!: "pageChange";

	@IsNotEmpty()
	@IsString()
	from!: string;

	@IsNotEmpty()
	@IsNumber()
	to!: number;
}
