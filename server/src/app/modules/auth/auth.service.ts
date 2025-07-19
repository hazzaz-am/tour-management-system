import AppError from "../../error-helpers/app-error";
import { IsActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { generateToken, verifyToken } from "../../utils/jwt-token";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { userTokens } from "../../utils/user-tokens";

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

	return {
		accessToken,
	};
};

export const AuthServices = {
	credentialsLogin,
	getNewAccessToken,
};
