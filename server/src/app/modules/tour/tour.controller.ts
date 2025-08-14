import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { TourServices } from "./tour.service";
import { sendResponse } from "../../utils/send-response";

/**
 * Tour Controllers
 */
const getAllTours = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;
	const result = await TourServices.getAllTours(
		query as Record<string, string>
	);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Tours retrieved successfully",
		data: result.data,
		meta: result.meta,
	});
});

const getSingleTour = catchAsync(async(req: Request, res: Response) => {
	const slug = req.params.slug
	const result = await TourServices.getSingleTour(slug)

	sendResponse(res, {
		success: true,
		message: "Tour retrived successfully",
		statusCode: 200,
		data: result
	})
})


const createTour = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const result = await TourServices.createTour(body);

	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Tour created successfully",
		data: result,
	});
});

const updatedTour = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const body = req.body;
	const result = await TourServices.updateTour(id, body);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Tour updated successfully",
		data: result,
	});
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await TourServices.deleteTour(id);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Tour deleted successfully",
		data: result,
	});
});

// ---------------------------------------------------------------------
/**
 * Tour Types Controllers
 */
const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;
	const result = await TourServices.getAllTourTypes(
		query as Record<string, string>
	);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Tour types retrieved successfully",
		data: result,
	});
});

const getSingleTourType = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await TourServices.getSingleTourType(id);

	sendResponse(res, {
		success: true,
		data: result,
		message: "Tour type retrieved successfully",
		statusCode: 200,
	});
});

const createTourType = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const result = await TourServices.createTourType(body);

	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Tour type created successfully",
		data: result,
	});
});

const updatedTourType = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const body = req.body;
	const result = await TourServices.updateTourType(id, body);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Tour type updated successfully",
		data: result,
	});
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await TourServices.deleteTourType(id);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Tour type deleted successfully",
		data: result,
	});
});

export const TourControllers = {
	getAllTours,
	getSingleTour,
	createTour,
	updatedTour,
	deleteTour,
	getAllTourTypes,
	createTourType,
	updatedTourType,
	deleteTourType,
	getSingleTourType,
};
