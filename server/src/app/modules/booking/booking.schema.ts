import z from "zod";
import { EBOOKING_STATUS } from "./booking.interface";

export const createBookingZodSchema = z.object({
	tour: z.string(),
	getCount: z.number().int().positive(),
});

export const updateBookingZodSchema = z.object({
	status: z.enum(Object.values(EBOOKING_STATUS) as [string]),
});
