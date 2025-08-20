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
import { useAddTourTypeMutation } from "@/store/features/tour/tour.Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const tourTypeSchema = z.object({
	name: z.string().min(1, "Tour type name is required"),
});

export default function AddTourTypeModal() {
	const form = useForm<z.infer<typeof tourTypeSchema>>({
		resolver: zodResolver(tourTypeSchema),
		defaultValues: {
			name: "",
		},
	});
	const [addTourType] = useAddTourTypeMutation();

	const onSubmitForm = async (data: z.infer<typeof tourTypeSchema>) => {
		try {
			const res = await addTourType(data).unwrap();
			if (res.success) {
				toast.success("Tour type added successfully");
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to add tour type");
		}
	};
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Add Tour Type</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Tour Type</DialogTitle>
					<DialogDescription className="sr-only">
						Add a new tour type
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form id="add-tour-type" onSubmit={form.handleSubmit(onSubmitForm)}>
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
					<Button type="submit" form="add-tour-type">
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
