import { Router } from "express";
import { TourControllers } from "./tour.controller";
import { checkAuth } from "../../middlewares/check-auth";
import { Role } from "../user/user.interface";
import { schemaValidation } from "../../middlewares/schema-validation";
import {
	createTourTypeZodSchema,
	createTourZodSchema,
	updateTourZodSchema,
} from "./tour.schema";

const router = Router();

/**
 * Tour Routes
 */
router.get("/", TourControllers.getAllTours);
router.post(
	"/create",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	schemaValidation(createTourZodSchema),
	TourControllers.createTour
);
router.patch(
	"/:id",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	schemaValidation(updateTourZodSchema),
	TourControllers.updatedTour
);
router.delete(
	"/:id",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	TourControllers.deleteTour
);

/**
 * Tour Type Routes
 */
router.get("/tour-types", TourControllers.getAllTourTypes);
router.post(
	"/create-tour-type",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	schemaValidation(createTourTypeZodSchema),
	TourControllers.createTourType
);
router.patch(
	"/tour-types/:id",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	schemaValidation(createTourTypeZodSchema),
	TourControllers.updatedTourType
);
router.delete(
	"/tour-types/:id",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	TourControllers.deleteTourType
);
export const TourRoutes = router;
