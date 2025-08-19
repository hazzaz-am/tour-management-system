import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { JwtPayload } from "jsonwebtoken";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
	const decodedToken = req.user as JwtPayload;
	const result = await BookingService.createBooking(
		req.body,
		decodedToken.userId
	);
	sendResponse(res, {
		success: true,
		statusCode: 201,
		message: "Booking created successfully",
		data: result,
	});
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
	const result = await BookingService.getAllBookings();
	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "Bookings retrived successfully",
		data: result,
	});
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
	const result = await BookingService.getUserBookings();
	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "Your Bookings retrieved successfully",
		data: {},
	});
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
	const bookingId = req.params.bookingId;
	const result = await BookingService.getSingleBooking(bookingId);
	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "Booking retrieved successfully",
		data: result,
	});
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
	const bookingId = req.params.bookingId;
	const result = await BookingService.updateBookingStatus(bookingId);
	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "Booking Status Updated Successfully",
		data: result,
	});
});

export const BookingController = {
	createBooking,
	getAllBookings,
	getUserBookings,
	getSingleBooking,
	updateBookingStatus,
};
