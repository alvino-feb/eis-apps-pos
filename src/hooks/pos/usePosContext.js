"use client";

import {
    useEffect,
} from "react";

import {
    getPosContext,
} from "../../services/pos/posContextService";

import {
    usePosContextStore,
} from "../../stores/pos/usePosContextStore";

import {
    getDeviceCode,
} from "../../lib/pos/device";

export const usePosContext =
    () => {
        const context =
            usePosContextStore(
                (state) =>
                    state.context
            );

        const loading =
            usePosContextStore(
                (state) =>
                    state.loading
            );

        const error =
            usePosContextStore(
                (state) =>
                    state.error
            );

        const setContext =
            usePosContextStore(
                (state) =>
                    state.setContext
            );

        const setLoading =
            usePosContextStore(
                (state) =>
                    state.setLoading
            );

        const setError =
            usePosContextStore(
                (state) =>
                    state.setError
            );

        useEffect(() => {
            let mounted = true;

            const load = async () => {
                const deviceCode =
                    getDeviceCode();

                if (!deviceCode) {
                    setError(
                        "POS device is not configured"
                    );

                    return;
                }

                try {
                    setLoading(true);

                    const response =
                        await getPosContext({
                            deviceCode,
                        });

                    if (!mounted) {
                        return;
                    }

                    setContext(
                        response.data
                    );
                } catch (error) {
                    if (!mounted) {
                        return;
                    }

                    setError(
                        error?.response
                            ?.data
                            ?.message ||
                            "Failed to load POS context"
                    );
                } finally {
                    if (mounted) {
                        setLoading(false);
                    }
                }
            };

            load();

            return () => {
                mounted = false;
            };
        }, [
            setContext,
            setLoading,
            setError,
        ]);

        return {
            context,
            loading,
            error,
        };
    };