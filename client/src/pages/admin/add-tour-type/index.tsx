import AddTourTypeModal from "@/components/modules/admin/tour-type/AddTourTypeModal";
import UpdateTourTypeModal from "@/components/modules/admin/tour-type/UpdateTourTypeModal";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useDeleteTourTypeMutation,
	useGetAllTourTypesQuery,
} from "@/store/features/tour/tour.Api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddTourType() {
	const { data } = useGetAllTourTypesQuery(undefined);
	const [deleteTourType] = useDeleteTourTypeMutation();

	const handleDeleteTourType = async (tourTypeId: string) => {
		try {
			const res = await deleteTourType(tourTypeId).unwrap();
			if (res.success) {
				toast.success("Tour type deleted successfully");
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to delete tour type");
		}
	};

	return (
		<div className="w-full max-w-7xl mx-auto px-5">
			<div className="flex justify-between my-8">
				<h1 className="text-xl font-semibold">Tour Types</h1>
				<AddTourTypeModal />
			</div>
			<div className="border border-muted rounded-md">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Name</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.data?.map((item) => (
							<TableRow key={item.name}>
								<TableCell className="font-medium w-full">
									{item?.name}
								</TableCell>
								<TableCell className="space-x-2">
									<UpdateTourTypeModal item={item}/>
									<Button
										size="sm"
										onClick={() => handleDeleteTourType(item._id)}
									>
										<Trash2 />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
