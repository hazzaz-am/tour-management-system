import { useUserInfoQuery } from "@/store/features/auth/authApi";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export function checkAuthorization(
	Component: ComponentType,
	requiredRole?: TRole
) {
	return function AuthWrapper() {
		const { data, isLoading } = useUserInfoQuery(undefined);

		if (!isLoading && !data?.data?.email) {
			return <Navigate to="/login" />;
		}

		if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
			return <Navigate to="/unauthorized" />;
		}

		return <Component />;
	};
}
