import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getData: build.query<USER.getUserResponse, USER.getUserRequest>({
      query: () => ({
        url: "/get-data",
        method: "GET",
      }),
      providesTags: ["data"],
    }),
    postData: build.mutation<USER.postUserResponse, USER.postUserRequest>({
      query: (data) => ({
        url: "/post-data",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),

    updateData: build.mutation<USER.updateUserResponse, USER.updateUserRequest>(
      {
        query: (updatedUser) => (
          {
            url: `/edit-data/${updatedUser.id}`,
            method: "PATCH",
            body: updatedUser,
          }
        ),
        invalidatesTags: ["data"],
      }
    ),

    deleteData: build.mutation<USER.deleteUserResponse, USER.deleteUserRequest>(
      {
        query: (id) => ({
          url: `/delete-data/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["data"],
      }
    ),
  }),
});

export const {
  useGetDataQuery,
  usePostDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
} = api;
