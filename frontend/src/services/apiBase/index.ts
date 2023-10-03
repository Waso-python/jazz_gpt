import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const BASE_URL = import.meta.env.VITE_API_URL + ':' + import.meta.env.VITE_API_PORT;
export const BACKEND_TOKEN = import.meta.env.VITE_API_BACKEND_TOKEN;

export const getRequestOptions = () => {
    return {
        credentials: "include",
        Access_token: BACKEND_TOKEN,
    }
}

export const handleErrorResponse = (response: any) => {
    if (response.status === 'TIMEOUT_ERROR') {
        return {status: 503}
    }
    return response;
}

export const apiBase = createApi({
    baseQuery: fetchBaseQuery({baseUrl: ''}),
    endpoints: () => ({}),
})