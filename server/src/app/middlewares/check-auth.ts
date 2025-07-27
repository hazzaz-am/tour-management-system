import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import AppError from "../error-helpers/app-error";
import { verifyToken } from "../utils/jwt-token";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth =
	(...authRoles: string[]) =>
	async (req: Request, _res: Response, next: NextFunction) => {
		try {
			const accessToken = req.headers.authorization;
			if (!accessToken) {
				throw new AppError(httpStatus.UNAUTHORIZED, "Access token is required");
			}

			const verifiedToken = verifyToken(
				accessToken,
				envVars.JWT_ACCESS_SECRET_TOKEN
			) as JwtPayload;

			const isUserExist = await User.findOne({
				email: verifiedToken.email,
			});

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

			if (!authRoles.includes(verifiedToken.role)) {
				throw new AppError(
					httpStatus.FORBIDDEN,
					"You do not have permission to access this resource"
				);
			}

			req.user = verifiedToken;
			next();
		} catch (error) {
			next(error);
		}
	};
