import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/send-response";
import httpStatus from "http-status-codes";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
	const loginInfo = await AuthServices.credentialsLogin(req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "Log in successful",
		success: true,
		data: loginInfo,
	});
});

export const AuthControllers = {
	credentialsLogin,
};
