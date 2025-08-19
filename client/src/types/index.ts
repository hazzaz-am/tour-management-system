export type { ISendOTP, IVerifyOTP, ILogin } from "./auth.type";

export interface IResponse<T, M = null> {
	statusCode: number;
	success: boolean;
	message: string;
	data: T,
  meta?: M
}
