import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/store/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const loginFormSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, { error: "Password must be at least 8 characters long" }),
});

export default function LoginForm({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const [login] = useLoginMutation();
	const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
		try {
			const res = await login(data).unwrap();
			console.log(res);
		} catch (err) {
			console.error(err);

			if (err.status === 401) {
				toast.error("Your account is not verified");
				navigate("/verify", { state: data.email });
			}
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="john@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</Form>

				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>

				<Button
					type="button"
					variant="outline"
					className="w-full cursor-pointer"
				>
					Login with Google
				</Button>
			</div>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/register" replace className="underline underline-offset-4">
					Register
				</Link>
			</div>
		</div>
	);
}
