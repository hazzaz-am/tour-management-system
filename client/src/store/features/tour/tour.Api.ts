import { baseApi } from "@/store/baseApi";

export const tourApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addTour: builder.mutation({
			query: (newTour) => ({
				method: "POST",
				url: "/tour/create",
				data: newTour,
			}),
			invalidatesTags: ["TOUR"],
		}),
		deleteTour: builder.mutation({
			query: (tourId: string) => ({
				method: "DELETE",
				url: `/tour/${tourId}`,
			}),
			invalidatesTags: ["TOUR"],
		}),
		updateTour: builder.mutation({
			query: ({ tourId, updatedTour }) => ({
				method: "PATCH",
				url: `/tour/${tourId}`,
				data: updatedTour,
			}),
			invalidatesTags: ["TOUR"],
		}),
		getAllTours: builder.query({
			query: () => ({
				method: "GET",
				url: "/tour",
			}),
		}),
		getSingleTour: builder.query({
			query: (slug: string) => ({
				method: "GET",
				url: `/tour/${slug}`,
			}),
		}),
	}),
});

export const {
	useAddTourMutation,
	useDeleteTourMutation,
	useUpdateTourMutation,
	useGetAllToursQuery,
	useGetSingleTourQuery,
} = tourApi;
