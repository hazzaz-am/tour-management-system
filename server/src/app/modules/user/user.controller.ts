import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import httpStatus from "http-status-codes";
import AppError from "../../error-helpers/app-error";

const createUser = catchAsync(async (req: Request, res: Response) => {
	const user = await UserServices.createUser(req.body);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "User created successfully",
		data: user,
	});
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
	const userId = req.params.id;
	const verifiedToken = req.user;
	const payload = req.body;

	if (!verifiedToken) {
		throw new AppError(httpStatus.BAD_REQUEST, "User not found");
	}

	const user = await UserServices.updateUser(userId, payload, verifiedToken);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User Updated  successfully",
		data: user,
	});
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;
	const result = await UserServices.getAllUsers(
		query as Record<string, string>
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		message: "All users retrieved successfully",
		success: true,
		data: result.data,
		meta: result.meta,
	});
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await UserServices.getSingleUser(id);

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "User retrived successfully",
		data: result.data,
	});
});

export const UserController = {
	createUser,
	updateUser,
	getAllUsers,
	getSingleUser
};
