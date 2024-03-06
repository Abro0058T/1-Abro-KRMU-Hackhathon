import { apiSlice } from "./apiSlice";
import { VIDEO_URL } from "../constants";

export const videoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVideo: builder.query({
      query: () => `${VIDEO_URL}/list/`,
    }),

    uploadVideo: builder.mutation({
      query: (formData) => ({
        url: `${VIDEO_URL}`,
        method: "POST",
        body: formData,
      }),
    }),

    // this route is not working in the backend ..... will need to display the latest work done by video-editor
    updateVideo: builder.mutation({
      query: ({ id, videoUpdates }) => ({
        url: `${VIDEO_URL}/edit/${id}`,
        method: "PUT",
        body: videoUpdates,
      }),
    }),

    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `${VIDEO_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),

    getSpecificVideo: builder.query({
      query: (id) => `${VIDEO_URL}/${id}`,
    }),
  }),
});

export const {
  useGetAllVideoQuery,
  useUploadVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useGetSpecificVideoQuery,
} = videoApiSlice;
