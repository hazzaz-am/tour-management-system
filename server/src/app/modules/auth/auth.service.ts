import AppError from "../../error-helpers/app-error";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import {
	createAccessTokenWithRefreshToken,
	userTokens,
} from "../../utils/user-tokens";
import { envVars } from "../../config/env";

const credentialsLogin = async (payload: Partial<IUser>) => {
	const { email, password } = payload;
	const isUserExist = await User.findOne({ email });

	if (!isUserExist) {
		throw new AppError(httpStatus.BAD_REQUEST, "Email doesn't exist");
	}

	const isPassMatch = await bcryptjs.compare(
		password as string,
		isUserExist.password as string
	);

	if (!isPassMatch) {
		throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match");
	}

	const tokens = userTokens(isUserExist) as JwtPayload;

	const user = isUserExist.toObject();
	delete user["password"];

	return {
		accessToken: tokens.accessToken,
		refreshToken: tokens.refreshToken,
		user,
	};
};

const getNewAccessToken = async (refreshToken: string) => {
	const token = await createAccessTokenWithRefreshToken(refreshToken);

	return {
		accessToken: token,
	};
};

const resetPassword = async (
	oldPassword: string,
	newPassword: string,
	decodedToken: JwtPayload
) => {
	const user = await User.findById(decodedToken.userId);

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	const isPasswordMatch = await bcryptjs.compare(
		oldPassword,
		user.password as string
	);

	if (!isPasswordMatch) {
		throw new AppError(httpStatus.NOT_FOUND, "Password doesn't match");
	}

	user.password = await bcryptjs.hash(
		newPassword,
		Number(envVars.BCRYPT_SALT_ROUND)
	);
	user.save();
};

export const AuthServices = {
	credentialsLogin,
	getNewAccessToken,
	resetPassword,
};
