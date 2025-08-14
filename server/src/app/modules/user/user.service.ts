import AppError from "../../error-helpers/app-error";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatusCodes from "http-status-codes";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./user.constant";

const createUser = async (payload: Partial<IUser>) => {
	const { email, password, ...rest } = payload;

	const isUserExist = await User.findOne({ email });

	if (isUserExist) {
		throw new AppError(httpStatusCodes.BAD_REQUEST, "User already exist");
	}

	const hashPassword = await bcrypt.hash(
		password as string,
		Number(envVars.BCRYPT_SALT_ROUND)
	);
	const authProvider: IAuthProvider = {
		provider: "credentials",
		providerId: email as string,
	};

	const user = await User.create({
		email,
		password: hashPassword,
		auths: [authProvider],
		...rest,
	});

	return user;
};

const updateUser = async (
	userId: string,
	payload: Partial<IUser>,
	decodedToken: JwtPayload
) => {
	const ifUserExist = await User.findById(userId);

	if (!ifUserExist) {
		throw new AppError(httpStatusCodes.NOT_FOUND, "User Not Found");
	}

	if (payload.role) {
		if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
			throw new AppError(httpStatusCodes.FORBIDDEN, "You are not authorized");
		}

		if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
			throw new AppError(httpStatusCodes.FORBIDDEN, "You are not authorized");
		}
	}

	if (payload.isActive || payload.isDeleted || payload.isVerified) {
		if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
			throw new AppError(httpStatusCodes.FORBIDDEN, "You are not authorized");
		}
	}

	if (payload.password) {
		payload.password = await bcrypt.hash(
			payload.password,
			envVars.BCRYPT_SALT_ROUND
		);
	}

	const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
		new: true,
		runValidators: true,
	});

	return newUpdatedUser;
};

const getAllUsers = async (query: Record<string, string>) => {
	const queryBuilder = new QueryBuilder(User.find(), query);
	const userData = queryBuilder
		.search(userSearchableFields)
		.filter()
		.sort()
		.fields()
		.paginate();

	const [data, meta] = await Promise.all([
		userData.build(),
		queryBuilder.getMeta(),
	]);

	return {
		data,
		meta,
	};
};

const getSingleUser = async (id: string) => {
	const user = await User.findById(id);
	return {
		data: user,
	};
};

export const UserServices = {
	createUser,
	getAllUsers,
	updateUser,
	getSingleUser
};
