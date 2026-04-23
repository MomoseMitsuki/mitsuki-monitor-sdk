import { Equals, IsString, IsNumber, IsNotEmpty } from "class-validator";

export class PvDto {
	@IsNotEmpty()
	@Equals("pv")
	subType!: "pv";

	@IsString()
	referrer!: string;

	@IsString()
	effectiveType!: string;

	@IsNotEmpty()
	@IsNumber()
	rtt!: number;
}
