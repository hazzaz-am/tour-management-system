import { Router } from "express";
import { UserController } from "./user.controller";
import { schemaValidation } from "../../middlewares/schema-validation";
import { createUserZodSchema } from "./user.schema";

const router = Router();

router.post(
	"/register",
	schemaValidation(createUserZodSchema),
	UserController.createUser
);
router.get("/all-users", UserController.getAllUsers);

export const UserRoutes = router;
