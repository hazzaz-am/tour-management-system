import { model, Schema } from "mongoose";
import { EBOOKING_STATUS, IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		tour: {
			type: Schema.Types.ObjectId,
			ref: "Tour",
			required: true,
		},
		payment: {
			type: Schema.Types.ObjectId,
			ref: "Payment",
		},
		guestCount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(EBOOKING_STATUS),
			default: EBOOKING_STATUS.PENDING,
		},
	},
	{
		timestamps: true,
	}
);

export const Booking = model<IBooking>("Booking", bookingSchema);
