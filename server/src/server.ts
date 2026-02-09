import mongoose from "mongoose";
import process from "process";
import { app } from "./app";
import { ENV_VARS } from "./app/config/env";

let server: ReturnType<typeof app.listen>;

const startServer = async (): Promise<void> => {
	try {
		await mongoose.connect(ENV_VARS.DB_URL);
		console.log("✅ DATABASE CONNECTED SUCCESSFULLY");
		server = app.listen(ENV_VARS.PORT, () => {
			console.log("✅ SERVER IS RUNNING ON PORT:", ENV_VARS.PORT);
		});
	} catch (error) {
		console.error(error);
	}
};

startServer();

/**
 *! Unhandled Rejection Error
 */
process.on("unhandledRejection", (reason) => {
	console.log("🚫 SERVER SHUTTING DOWN");
	console.error("[UNHANDLED REJECTION] ", reason);
	console.trace("[TRACE] for this UNHANDLED PROMISE: -------");

	if (server) {
		server.close(() => {
			process.exit(1);
		});
	}

	process.exit(1);
});

/**
 *! UnCaught Exception Error
 */
process.on("uncaughtException", (err) => {
	console.log("🚫 SERVER SHUTTING DOWN");
	console.error("[UNCAUGHT EXCEPTION] ", err);
	console.trace("[TRACE] for UNCAUGHT EXCEPTION: -------");

	if (server) {
		server.close(() => {
			process.exit(1);
		});
	}

	process.exit(1);
});

/**
 * ! Sigterm Error
 */

process.on("SIGTERM", () => {
	console.error("[SIGTERM]");
	server.close(() => {
		process.exit(1);
	});
});
