import AppError from "../../error-helpers/app-error";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

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

	return {
		email: isUserExist.email,
	};
};

export const AuthServices = {
	credentialsLogin,
};
