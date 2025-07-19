import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/send-response";
import httpStatus from "http-status-codes";
import AppError from "../../error-helpers/app-error";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
	const loginInfo = await AuthServices.credentialsLogin(req.body);

	res.cookie("accessToken", loginInfo.accessToken, {
		httpOnly: true,
		secure: false,
	});

	res.cookie("refreshToken", loginInfo.refreshToken, {
		httpOnly: true,
		secure: false,
	});

	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "Log in successful",
		success: true,
		data: loginInfo,
	});
});

const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		throw new AppError(httpStatus.BAD_REQUEST, "No refresh token received");
	}

	const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "Log in successful",
		success: true,
		data: tokenInfo,
	});
});

export const AuthControllers = {
	credentialsLogin,
	getNewAccessToken,
};
