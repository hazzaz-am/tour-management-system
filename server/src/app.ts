import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
	res.status(200).json({
		message: "Server health is OK",
	});
});

export default app;
