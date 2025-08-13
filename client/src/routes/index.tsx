import App from "@/App";
import AboutPage from "@/pages/about";
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
]);
