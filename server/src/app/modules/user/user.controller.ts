import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import httpStatus from "http-status-codes";

const createUser = catchAsync(async (req: Request, res: Response) => {
	const user = await UserServices.createUser(req.body);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "User created successfully",
		data: user,
	});
});

const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
	const result = await UserServices.getAllUsers();
	
	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "All users retrieved successfully",
		success: true,
		data: result.data,
		meta: result.meta,
	});
});

export const UserController = {
	createUser,
	getAllUsers,
};
