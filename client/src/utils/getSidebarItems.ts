import { ROLE } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
	switch (userRole) {
		case ROLE.SUPER_ADMIN:
			return [...adminSidebarItems];
		case ROLE.ADMIN:
			return [...adminSidebarItems];
		case ROLE.USER:
			return [...userSidebarItems];

		default:
			return [];
	}
};
