/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly PROD: boolean
    readonly VITE_API_URL: string
    readonly VITE_API_PORT: string
    readonly VITE_API_BACKEND_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}