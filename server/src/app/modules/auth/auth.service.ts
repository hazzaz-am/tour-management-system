import AppError from "../../error-helpers/app-error";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { createAccessTokenWithRefreshToken } from "../../utils/user-tokens";
import { envVars } from "../../config/env";

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
	getNewAccessToken,
	resetPassword,
};
