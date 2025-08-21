import ImageUploader from "@/components/image-uploader";
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
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { useAddDivisionMutation } from "@/store/features/division/division.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const divisionSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().min(1, "Description is required"),
});

export default function AddDivisionModal() {
	const [image, setImage] = useState<File | FileMetadata | null>(null);
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof divisionSchema>>({
		resolver: zodResolver(divisionSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});
	const [addDivision] = useAddDivisionMutation();

	const onSubmitForm = async (data: z.infer<typeof divisionSchema>) => {
		const formData = new FormData();
		formData.append("data", JSON.stringify(data));
		if (!image) {
			toast.error("Please upload an image");
			return;
		}

		if (image) {
			formData.append("file", image as File);
		}
		const toastId = toast.loading("Adding division...");
		try {
			const res = await addDivision(formData).unwrap();
			if (res.success) {
				toast.success("Division added successfully", { id: toastId });
				setOpen(false);
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to add division", { id: toastId });
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Division</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Division</DialogTitle>
					<DialogDescription className="sr-only">
						Add a new division
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						id="add-division"
						onSubmit={form.handleSubmit(onSubmitForm)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Division Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="Description" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
					<ImageUploader onChange={setImage} />
				</Form>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form="add-division">
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
