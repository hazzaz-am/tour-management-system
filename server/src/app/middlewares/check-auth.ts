import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import AppError from "../error-helpers/app-error";
import { verifyToken } from "../utils/jwt-token";
import { envVars } from "../config/env";

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

			if (!authRoles.includes(verifiedToken.role)) {
				throw new AppError(
					httpStatus.FORBIDDEN,
					"You do not have permission to access this resource"
				);
			}

			next();
		} catch (error) {
			next(error);
		}
	};
