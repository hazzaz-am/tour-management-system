import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateTourTypeMutation } from "@/store/features/tour/tour.Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface IUpdateTourTypeProps {
	item: {
		_id: string;
		name: string;
	};
}

const tourTypeSchema = z.object({
	name: z.string().min(1, "Tour type name is required"),
});

export default function UpdateTourTypeModal({ item }: IUpdateTourTypeProps) {
	const form = useForm<z.infer<typeof tourTypeSchema>>({
		resolver: zodResolver(tourTypeSchema),
		defaultValues: {
			name: item.name,
		},
	});
	const [updateTourType] = useUpdateTourTypeMutation();

	const onSubmitForm = async (data: z.infer<typeof tourTypeSchema>) => {
		try {
			const res = await updateTourType({
				tourTypeId: item._id,
				...data,
			}).unwrap();
			if (res.success) {
				toast.success("Tour type updated successfully");
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to add tour type");
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
					<Edit2 />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Tour Type</DialogTitle>
					<DialogDescription className="sr-only">
						Update tour type
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						id="update-tour-type"
						onSubmit={form.handleSubmit(onSubmitForm)}
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Tour Type Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form="update-tour-type">
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
