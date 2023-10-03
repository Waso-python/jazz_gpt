import {configureStore} from '@reduxjs/toolkit'

import {apiBase} from "@services/apiBase";
import {appReducer} from "@store/app";

export const store = configureStore({
    reducer: {
        [apiBase.reducerPath]:apiBase.reducer,
        app: appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiBase.middleware),
    devTools: !import.meta.env.PROD,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch