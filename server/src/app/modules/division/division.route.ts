import { Router } from "express";
import { checkAuth } from "../../middlewares/check-auth";
import { Role } from "../user/user.interface";
import { schemaValidation } from "../../middlewares/schema-validation";
import {
	createDivisionZodSchema,
	updateDivisionZodSchema,
} from "./division.schema";
import { DivisionControllers } from "./division.controller";

const router = Router();

router.post(
	"/create",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	schemaValidation(createDivisionZodSchema),
	DivisionControllers.createDivision
);
router.get("/", DivisionControllers.getAllDivision);
router.get("/:slug", DivisionControllers.getSingleDivision);
router.patch(
	"/:id",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	schemaValidation(updateDivisionZodSchema),
	DivisionControllers.updateDivision
);
router.delete(
	"/:id",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	DivisionControllers.deleteDivision
);

export const DivisionRoutes = router;
