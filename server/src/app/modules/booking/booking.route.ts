import { Router } from "express";
import { checkAuth } from "../../middlewares/check-auth";
import { Role } from "../user/user.interface";
import { schemaValidation } from "../../middlewares/schema-validation";
import {
	createBookingZodSchema,
	updateBookingZodSchema,
} from "./booking.schema";
import { BookingController } from "./booking.controller";

const router = Router();

router.post(
	"/",
	checkAuth(...Object.values(Role)),
	schemaValidation(createBookingZodSchema),
	BookingController.createBooking
);

router.get(
	"/my-bookings",
	checkAuth(...Object.values(Role)),
	BookingController.getUserBookings
);

router.get(
	"/:bookingId",
	checkAuth(...Object.values(Role)),
	BookingController.getSingleBooking
);

router.patch(
	"/:bookingId/status",
	checkAuth(...Object.values(Role)),
	schemaValidation(updateBookingZodSchema),
	BookingController.updateBookingStatus
);

export const BookingRoutes = router;
