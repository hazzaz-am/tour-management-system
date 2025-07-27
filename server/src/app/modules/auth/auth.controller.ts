import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/send-response";
import httpStatus from "http-status-codes";
import AppError from "../../error-helpers/app-error";
import { setCookie } from "../../utils/set-cookie";
import { envVars } from "../../config/env";
import { userTokens } from "../../utils/user-tokens";

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

	if (!decodedToken) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

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

const googleCallback = catchAsync(async (req: Request, res: Response) => {
	let redirectTo = req.query.state ? (req.query.state as string) : "";

	if (redirectTo.startsWith("/")) {
		redirectTo = redirectTo.slice(1);
	}
	const user = req.user;

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	const tokenInfo = userTokens(user);
	setCookie(res, tokenInfo);

	res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
});

export const AuthControllers = {
	credentialsLogin,
	getNewAccessToken,
	resetPassword,
	googleCallback,
	logout,
};
