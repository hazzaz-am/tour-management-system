import AddDivisionPage from "@/pages/admin/add-division";
import AddTourPage from "@/pages/admin/add-tour";
import AddTourType from "@/pages/admin/add-tour-type";
import { lazy } from "react";

const AnalyticsPage = lazy(() => import("@/pages/admin/analytics"));

export const adminSidebarItems = [
	{
		title: "Dashboard",
		items: [
			{
				title: "Analytics",
				url: "/admin/analytics",
				component: AnalyticsPage,
			},
		],
	},
	{
		title: "Tour Management",
		items: [
			{
				title: "Add Tour",
				url: "/admin/add-tour",
				component: AddTourPage,
			},
			{
				title: "Add Tour Type",
				url: "/admin/add-tour-type",
				component: AddTourType,
			},
			{
				title: "Add Division",
				url: "/admin/add-division",
				component: AddDivisionPage,
			},
		],
	},
];
