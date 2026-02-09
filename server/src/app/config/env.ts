// Env Config Type
interface IEnvConfig {
	PORT: string;
	DB_URL: string;
	NODE_ENV: string;
}

// Required Env Variables
const REQUIRED_ENV_VARIABLES = ["PORT", "DB_URL", "NODE_ENV"];

// Load Env Variables
const loadEnvVariables = (): IEnvConfig => {
	REQUIRED_ENV_VARIABLES.forEach((key) => {
		if (process.env[key] === undefined) {
			throw new Error(`[${key}] env variables is missing`);
		}
	});

	return {
		PORT: process.env.PORT as string,
		DB_URL: process.env.DB_URL as string,
		NODE_ENV: process.env.NODE_ENV as string,
	};
};

export const ENV_VARS = loadEnvVariables();
