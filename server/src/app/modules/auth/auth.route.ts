import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/check-auth";
import { Role } from "../user/user.interface";
import passport from "passport";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post("/logout", AuthControllers.logout);
router.post(
	"/reset-password",
	checkAuth(...Object.values(Role)),
	AuthControllers.resetPassword
);
router.get(
	"/google",
	async (req: Request, res: Response, next: NextFunction) => {
		const redirect = (req.query.redirect as string) || "/";
		passport.authenticate("google", {
			scope: ["profile", "email"],
			state: redirect,
		})(req, res, next);
	}
);

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	AuthControllers.googleCallback
);

export const AuthRoutes = router;
