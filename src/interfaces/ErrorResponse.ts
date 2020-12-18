import { ApiError } from "./ApiError";

export interface ErrorResponse {
  errors: ApiError[];
}
