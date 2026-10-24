"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getPosProducts,
} from "../../services/pos/posProductService";

export const usePosProducts =
    ({
        warehouseId,
        search,
        categoryId,
    }) => {
        const [
            products,
            setProducts,
        ] = useState([]);

        const [
            loading,
            setLoading,
        ] = useState(false);

        const [
            error,
            setError,
        ] = useState(null);

        useEffect(() => {
            if (!warehouseId) {
                return;
            }

            let mounted = true;

            const load =
                async () => {
                    try {
                        setLoading(true);
                        setError(null);

                        const response =
                            await getPosProducts(
                                {
                                    warehouseId,
                                    search,
                                    categoryId,
                                    page: 1,
                                    limit: 100,
                                }
                            );

                        if (!mounted) {
                            return;
                        }

                        setProducts(
                            response.data
                                ?.items ??
                                []
                        );
                    } catch (error) {
                        if (!mounted) {
                            return;
                        }

                        setError(
                            error?.response
                                ?.data
                                ?.message ||
                                "Failed to load products"
                        );
                    } finally {
                        if (mounted) {
                            setLoading(
                                false
                            );
                        }
                    }
                };

            load();

            return () => {
                mounted = false;
            };
        }, [
            warehouseId,
            search,
            categoryId,
        ]);

        return {
            products,
            loading,
            error,
        };
    };