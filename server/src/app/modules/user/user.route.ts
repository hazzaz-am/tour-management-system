import { Router } from "express";
import { UserController } from "./user.controller";
import { schemaValidation } from "../../middlewares/schema-validation";
import { createUserZodSchema, updateUserZodSchema } from "./user.schema";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/check-auth";

const router = Router();

router.post(
	"/register",
	schemaValidation(createUserZodSchema),
	UserController.createUser
);

router.get(
	"/all-users",
	checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
	UserController.getAllUsers
);

router.patch(
	"/:id",
	schemaValidation(updateUserZodSchema),
	checkAuth(...Object.values(Role)),
	UserController.updateUser
);

export const UserRoutes = router;
