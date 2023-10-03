import {apiBase, getRequestOptions, handleErrorResponse, BASE_URL} from "../apiBase";

const apiAnalizeInfo = apiBase.injectEndpoints({
    endpoints: (build => ({
        uploadFile: build.mutation({
            query: (data) => ({
                url: `${BASE_URL}/upload_file`,
                method: 'POST',
                body: data,
                headers: {
                    ...getRequestOptions()
                },

            }),
            transformResponse: (response) => response,
            transformErrorResponse: handleErrorResponse,
        }),
        getSummary: build.mutation({
            query: (fileId) => ({
                method: 'POST',
                url: `${BASE_URL}/get_ideas?file_id=${fileId}`,
                headers: {
                    ...getRequestOptions()
                },

            }),
            transformResponse: (response) => response.ideas,
            transformErrorResponse: handleErrorResponse,
        }),
        getPsychologicalPortrait: build.mutation({
            query: (fileId) => ({
                method: 'POST',
                url: `${BASE_URL}/get_psyhologic?file_id=${fileId}`,
                headers: {
                    ...getRequestOptions()
                },

            }),
            transformResponse: (response) => response.psyhologic,
            transformErrorResponse: handleErrorResponse,
        }),
        getLinks: build.mutation({
            query: (fileId) => ({
                method: 'POST',
                url: `${BASE_URL}/get_links?file_id=${fileId}`,
                headers: {
                    ...getRequestOptions()
                },

            }),
            transformResponse: (response) => response.links,
            transformErrorResponse: handleErrorResponse,
        }),
        getMood: build.mutation({
            query: (fileId) => ({
                method: 'POST',
                url: `${BASE_URL}/emotion?file_id=${fileId}`,
                headers: {
                    ...getRequestOptions()
                },

            }),
            transformResponse: (response) => response[0],
            transformErrorResponse: handleErrorResponse,
        }),
    })),
    overrideExisting: false
})

export const {
    useUploadFileMutation,
    useGetSummaryMutation,
    useGetLinksMutation,
    useGetMoodMutation,
    useGetPsychologicalPortraitMutation,
} = apiAnalizeInfo;
