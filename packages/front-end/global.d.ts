declare global {
    interface Window {
        __config__: {
            publicUrl: string
            backendUrl: string
        }
    }
}

export {}
