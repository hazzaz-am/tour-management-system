import { Outlet } from "react-router";
import CommonLayout from "./components/layouts/CommonLayout";
import { adminSidebarItems } from "./routes/adminSidebarItems";
import { generateRoutes } from "./utils/generateRoutes";

export default function App() {
	console.log(generateRoutes(adminSidebarItems));
	return (
		<CommonLayout>
			<Outlet />
		</CommonLayout>
	);
}
