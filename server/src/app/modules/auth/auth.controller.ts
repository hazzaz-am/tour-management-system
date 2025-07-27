import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/send-response";
import httpStatus from "http-status-codes";
import AppError from "../../error-helpers/app-error";
import { setCookie } from "../../utils/set-cookie";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
	const loginInfo = await AuthServices.credentialsLogin(req.body);
	setCookie(res, loginInfo);

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
	setCookie(res, tokenInfo);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "Log in successful",
		success: true,
		data: tokenInfo,
	});
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
	const decodedToken = req.user;
	const { oldPassword, newPassword } = req.body;

	await AuthServices.resetPassword(oldPassword, newPassword, decodedToken);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "Password changed successfully",
		success: true,
		data: null,
	});
});

const logout = catchAsync(async (_req: Request, res: Response) => {
	res.clearCookie("accessToken", {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
	});

	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
	});

	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "Logout successful",
		success: true,
		data: null,
	});
});

export const AuthControllers = {
	credentialsLogin,
	getNewAccessToken,
	resetPassword,
	logout,
};
