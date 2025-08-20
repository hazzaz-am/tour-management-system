import type { ComponentType } from "react";

export type { ISendOTP, IVerifyOTP, ILogin } from "./auth.type";

export interface IResponse<T, M = null> {
	statusCode: number;
	success: boolean;
	message: string;
	data: T;
	meta?: M;
}

export interface ISidebarItmes {
	title: string;
	items: {
		title: string;
		url: string;
		component: ComponentType;
	}[];
}


export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER"