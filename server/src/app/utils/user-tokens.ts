import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../error-helpers/app-error";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt-token";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes";

export const userTokens = (user: Partial<IUser>) => {
	const jwtPayload = {
		userId: user._id,
		email: user.email,
		role: user.role,
	};

	const accessToken = generateToken(
		jwtPayload,
		envVars.JWT_ACCESS_SECRET_TOKEN,
		envVars.JWT_ACCESS_EXPIRES_IN
	);

	const refreshToken = generateToken(
		jwtPayload,
		envVars.JWT_REFRESH_TOKEN,
		envVars.JWT_REFRESH_EXPIRES
	);

	return {
		accessToken,
		refreshToken,
	};
};

export const createAccessTokenWithRefreshToken = async (
	refreshToken: string
) => {
	const verifiedRefreshToken = verifyToken(
		refreshToken,
		envVars.JWT_REFRESH_TOKEN
	) as JwtPayload;

	const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

	if (!isUserExist) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	if (
		isUserExist.isActive === IsActive.BLOCKED ||
		isUserExist.isActive === IsActive.INACTIVE
	) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			`User is ${isUserExist.isActive}`
		);
	}

	if (isUserExist.isDeleted) {
		throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
	}

	const jwtPayload = {
		userId: isUserExist._id,
		email: isUserExist.email,
		role: isUserExist.role,
	};

	const accessToken = generateToken(
		jwtPayload,
		envVars.JWT_ACCESS_SECRET_TOKEN,
		envVars.JWT_ACCESS_EXPIRES_IN
	);

	return accessToken;
};
