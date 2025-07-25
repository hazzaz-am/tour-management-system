/* eslint-disable no-unused-vars */
import { Types } from "mongoose";

export enum Role {
	SUPER_ADMIN = "SUPER_ADMIN",
	ADMIN = "ADMIN",
	USER = "USER",
	GUIDE = "GUIDE",
}

/** Auth Providers
 * * Google
 * * email/password
 * * Task - Facebook
 */

export interface IAuthProvider {
	provider: "credentials" | "google";
	providerId: string;
}

export enum IsActive {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	BLOCKED = "BLOCKED",
}

export interface IUser {
	_id?: Types.ObjectId;
	name: string;
	email: string;
	password?: string;
	phone?: string;
	picture?: string;
	address?: string;
	isDeleted?: boolean;
	isActive?: IsActive;
	isVerified?: boolean;
	role: Role;

	auths: IAuthProvider[];
	bookings?: Types.ObjectId[];
	guides?: Types.ObjectId[];
}
