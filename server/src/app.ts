import express, { Request, Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
	res.status(200).json({
		message: "Server health is OK",
	});
});

export default app;
