import App from "@/App";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import VerifyAccountPage from "@/pages/verify";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { userSidebarItems } from "./userSidebarItems";
import { checkAuthorization } from "@/utils/checkAuthorization";
import { ROLE } from "@/constants/role";
import type { TRole } from "@/types";
import UnauthorizedPage from "@/pages/unauthorized";

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
		path: "/admin",
		Component: checkAuthorization(DashboardLayout, ROLE.SUPER_ADMIN as TRole),
		children: [
			{ index: true, element: <Navigate to="/admin/analytics" /> },
			...generateRoutes(adminSidebarItems),
		],
	},
	{
		path: "/user",
		Component: checkAuthorization(DashboardLayout, ROLE.USER as TRole),
		children: [
			{ index: true, element: <Navigate to="/user/bookings" /> },
			...generateRoutes(userSidebarItems),
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
	{
		path: "/unauthorized",
		Component: UnauthorizedPage,
	}
]);
