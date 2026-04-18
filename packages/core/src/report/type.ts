import type { PerformanceData } from "../performance";
import type { ErrorData } from "../error";
import type { ActionData } from "../action";
import type { BehaviorData } from "../behavior";
import type { ApiData } from "../api";

export type ReportData = ErrorData | PerformanceData | ActionData | BehaviorData | ApiData;
export type ReportType = "error" | "performance" | "action" | "behavior" | "api";
