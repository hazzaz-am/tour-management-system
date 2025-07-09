/* eslint-disable no-console */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email } = req.body;

		const user = await User.create({
			name,
			email,
		});
		res.status(StatusCodes.CREATED).json({
			message: "User created successfully",
			user,
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: error.message });
		} else {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: "An unexpected error occurred." });
		}
	}
};

export const UserController = {
	createUser,
};
