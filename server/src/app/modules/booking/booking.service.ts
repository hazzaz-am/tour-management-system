import AppError from "../../error-helpers/app-error";
import { Tour } from "../tour/tour.model";
import { User } from "../user/user.model";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import httpStatus from "http-status-codes";

const getTransactionId = () => {
	return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
	const transactionId = getTransactionId();

	const session = await Booking.startSession();
	session.startTransaction();

	try {
		const user = await User.findById(userId);

		if (!user?.phone || !user.address) {
			throw new AppError(httpStatus.BAD_REQUEST, "Please update your profile");
		}

		const tour = await Tour.findById(payload.tour).select("costFrom");

		if (!tour?.costFrom) {
			throw new AppError(httpStatus.BAD_REQUEST, "No tour cost found");
		}
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

const getAllBookings = async () => {};

const getUserBookings = async () => {};

const getSingleBooking = async (bookingId: string) => {
	const booking = await Booking.findById(bookingId);
	return booking;
};

const updateBookingStatus = async (bookingId: string) => {};

export const BookingService = {
	createBooking,
	getAllBookings,
	getUserBookings,
	getSingleBooking,
	updateBookingStatus,
};
