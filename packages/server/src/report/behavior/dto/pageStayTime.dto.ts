import { Equals, IsString, IsNumber, IsNotEmpty } from "class-validator";

export class PageStayTimeDto {
	@IsNotEmpty()
	@Equals("pageStayTime")
	subType!: "pageStayTime";

	@IsString()
	effectiveType!: string;

	@IsNotEmpty()
	@IsNumber()
	stayTime!: number;
}
