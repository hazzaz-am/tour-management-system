import { baseApi } from "@/store/baseApi";
import type { ITourTypeResponse, ITypeData } from "@/types/tour.type";

export const tourApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addTourType: builder.mutation({
			query: (tourName) => ({
				method: "POST",
				url: "/tour/create-tour-type",
				data: tourName,
			}),
			transformResponse: (response) => response.data,
			invalidatesTags: ["TOUR"],
		}),
		getAllTourTypes: builder.query<ITypeData, undefined>({
			query: () => ({
				method: "GET",
				url: "/tour/tour-types",
			}),
			transformResponse: (response: ITourTypeResponse) => response?.data,
			providesTags: ["TOUR"],
		}),
		updateTourType: builder.mutation({
			query: ({ tourTypeId, name }: { tourTypeId: string; name: string }) => ({
				method: "PATCH",
				url: `tour/tour-types/${tourTypeId}`,
				data: { name },
			}),
			invalidatesTags: ["TOUR"],
		}),
		deleteTourType: builder.mutation({
			query: (tourTypeId) => ({
				method: "DELETE",
				url: `/tour/tour-types/${tourTypeId}`,
			}),
			invalidatesTags: ["TOUR"],
		}),
		getSingleTourType: builder.query({
			query: (tourTypeId) => ({
				method: "GET",
				url: `tour/tour-types/${tourTypeId}`,
			}),
		}),
	}),
});

export const {
	useAddTourTypeMutation,
	useGetAllTourTypesQuery,
	useUpdateTourTypeMutation,
	useDeleteTourTypeMutation,
	useGetSingleTourTypeQuery,
} = tourApi;
