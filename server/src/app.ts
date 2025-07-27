import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/global-error";
import { notFoundHandler } from "./app/middlewares/not-found";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import { envVars } from "./app/config/env";
import "./app/config/passport";

const app = express();

app.use(
	expressSession({
		secret: envVars.EXPRESS_SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
	res.status(200).json({
		message: "Server health is OK",
	});
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
