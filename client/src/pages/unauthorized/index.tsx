import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Home, LogIn, ShieldX } from "lucide-react";
import { Link } from "react-router";

export default function UnauthorizedPage() {
	return (
		<section className="min-h-svh flex items-center justify-center p-6 bg-background">
			<div className="w-full max-w-md">
				<div className="flex flex-col items-center gap-8">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2 font-medium">
						<Logo />
					</Link>

					{/* Main Card */}
					<Card className="w-full">
						<CardHeader className="text-center">
							<div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-destructive/10">
								<ShieldX className="size-10 text-destructive" />
							</div>
							<CardTitle className="text-2xl font-bold">
								Access Denied
							</CardTitle>
							<CardDescription className="text-base">
								You don't have permission to access this page. Please check your
								credentials or contact an administrator.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-2">
								<Button asChild className="w-full">
									<Link to="/">
										<Home className="mr-2 size-4" />
										Go to Homepage
									</Link>
								</Button>
								<Button asChild variant="outline" className="w-full">
									<Link to="/login">
										<LogIn className="mr-2 size-4" />
										Sign In
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Additional Help Text */}
					<div className="text-center">
						<p className="text-sm text-muted-foreground">
							If you believe this is an error, please{" "}
							<Link
								to="/contact"
								className="text-primary hover:underline font-medium"
							>
								Contact Support
							</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
