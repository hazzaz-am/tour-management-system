import App from "@/App";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import VerifyAccountPage from "@/pages/verify";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
				path: "/about",
				Component: AboutPage,
			},
		],
	},
	{
		path: "/login",
		Component: LoginPage,
	},
	{
		path: "/register",
		Component: RegisterPage,
	},
	{
		path: "/verify",
		Component: VerifyAccountPage,
	},
]);
