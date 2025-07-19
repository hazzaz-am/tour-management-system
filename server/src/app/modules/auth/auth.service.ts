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

export const AuthServices = {
	credentialsLogin,
	getNewAccessToken,
};
