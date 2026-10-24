import { create } from "zustand";

export const usePosContextStore =
    create((set) => ({
        context: null,

        loading: false,

        error: null,

        setContext: (context) => {
            set({
                context,
                error: null,
            });
        },

        setLoading: (loading) => {
            set({
                loading,
            });
        },

        setError: (error) => {
            set({
                error,
            });
        },

        clearContext: () => {
            set({
                context: null,
                error: null,
                loading: false,
            });
        },
    }));