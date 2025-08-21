import { baseApi } from "@/store/baseApi";

export const divisionApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addDivision: builder.mutation({
			query: (divisionData) => ({
				method: "POST",
				url: "/division/create",
				data: divisionData,
			}),
			invalidatesTags: ["DIVISION"],
		}),
		deleteDivision: builder.mutation({
			query: (divisionId: string) => ({
				method: "DELETE",
				url: `/division/${divisionId}`,
			}),
			invalidatesTags: ["DIVISION"],
		}),
		getAllDivisions: builder.query({
			query: () => ({
				method: "GET",
				url: "/division",
			}),
			providesTags: ["DIVISION"],
		}),
		updateDivision: builder.mutation({
			query: ({ divisionId, divisionData }) => ({
				method: "PATCH",
				url: `/division/${divisionId}`,
				data: divisionData,
			}),
		}),
	}),
});

export const {
	useAddDivisionMutation,
	useGetAllDivisionsQuery,
	useDeleteDivisionMutation,
	useUpdateDivisionMutation,
} = divisionApi;
