import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
	PORT: string;
	DATABASE_URL: string;
	NODE_ENV: "development" | "production";
	JWT_ACCESS_SECRET_TOKEN: string;
	JWT_ACCESS_EXPIRES_IN: string;
	BCRYPT_SALT_ROUND: string;
	SUPER_ADMIN_EMAIL: string;
	SUPER_ADMIN_PASSWORD: string;
}

const loadEnvVariables = (): EnvConfig => {
	const requiredEnvVariables: string[] = [
		"PORT",
		"DATABASE_URL",
		"NODE_ENV",
		"JWT_ACCESS_SECRET_TOKEN",
		"JWT_ACCESS_EXPIRES_IN",
		"BCRYPT_SALT_ROUND",
		"SUPER_ADMIN_EMAIL",
		"SUPER_ADMIN_PASSWORD",
	];

	requiredEnvVariables.forEach((key) => {
		if (!process.env[key]) {
			throw new Error(`Required environment variable "${key}" is missing`);
		}
	});

	return {
		PORT: process.env.PORT as string,
		DATABASE_URL: process.env.DATABASE_URL as string,
		NODE_ENV: process.env.NODE_ENV as "development" | "production",
		JWT_ACCESS_SECRET_TOKEN: process.env.JWT_ACCESS_SECRET_TOKEN as string,
		JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN as string,
		BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
		SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
		SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
	};
};

export const envVars = loadEnvVariables();
