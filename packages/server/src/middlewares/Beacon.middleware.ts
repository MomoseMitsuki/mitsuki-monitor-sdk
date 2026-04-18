import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class BeaconMiddleware implements NestMiddleware {
	use(req: Request, _res: Response, next: NextFunction) {
		if (typeof req.body === "string" && req.header("content-type")?.includes("text/plain")) {
			try {
				req.body = JSON.parse(req.body);
			} catch {}
		}
		next();
	}
}
