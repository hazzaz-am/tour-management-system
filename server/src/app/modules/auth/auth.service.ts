import AppError from "../../error-helpers/app-error";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/jwt-token";
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
		token: accessToken,
	};
};

export const AuthServices = {
	credentialsLogin,
};
