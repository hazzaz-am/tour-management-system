import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { DivisionServices } from "./division.service";
import { sendResponse } from "../../utils/send-response";

const createDivision = catchAsync(async (req: Request, res: Response) => {
	const result = await DivisionServices.createDivision(req.body);

	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Division created successfully",
		data: result,
	});
});

const getAllDivision = catchAsync(async (_req: Request, res: Response) => {
	const result = await DivisionServices.getAllDivision();

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Divisions retrieved successfully",
		data: result.data,
		meta: result.meta,
	});
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
	const slug = req.params.slug;
	const result = await DivisionServices.getSingleDivision(slug);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Division retrieved successfully",
		data: result.data,
	});
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await DivisionServices.updateDivision(id, req.body);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Division updated successfully",
		data: result,
	});
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await DivisionServices.deleteDivision(id);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Division deleted",
		data: result,
	});
});

export const DivisionControllers = {
	createDivision,
	getAllDivision,
	getSingleDivision,
	updateDivision,
	deleteDivision,
};
