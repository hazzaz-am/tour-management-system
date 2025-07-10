/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		throw new Error("This is a test error for global error handler");
		const user = await UserServices.createUser(req.body);
		res.status(StatusCodes.CREATED).json({
			message: "User created successfully",
			user,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const UserController = {
	createUser,
};
