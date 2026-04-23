import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { BaseDto } from "src/shared/base.dto";
import { PageStayTimeDto } from "./pageStayTime.dto";
import { PvDto } from "./pv.dto";
import { PageChangeDto } from "./pageChange.dto";
import { RouterChangeDto } from "./routerChange.dto";

class BaseBehaviorDto {
	@IsNotEmpty()
	@IsString()
	subType!: string;
}

export class BehaviorDto extends BaseDto {
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => BaseBehaviorDto, {
		discriminator: {
			property: "subType",
			subTypes: [
				{ value: PvDto, name: "pv" },
				{ value: PageChangeDto, name: "pageChange" },
				{ value: PageStayTimeDto, name: "pageStayTime" },
				{ value: RouterChangeDto, name: "vueRouterChange" },
				{ value: RouterChangeDto, name: "reactRouterChange" }
			]
		},
		keepDiscriminatorProperty: true
	})
	data!: Array<PvDto | PageStayTimeDto | PageChangeDto>;
}
