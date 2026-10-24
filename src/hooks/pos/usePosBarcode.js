"use client";

import { useCallback, useState } from "react";

// import { getProductByBarcode } from "../../services/pos/posBarcodeService";

import { usePosStore } from "../../stores/pos/usePosStore";

export const usePosBarcode = ({
    warehouseId,
}) => {
    const addToCart =
        usePosStore(
            (state) =>
                state.addToCart
        );

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);

    const [variantSelection, setVariantSelection] =
        useState(null);

    const scanBarcode =
        useCallback(
            async (barcode) => {
                if (!barcode) return;

                const cleanBarcode =
                    barcode.trim();

                if (!cleanBarcode) return;

                try {
                    setLoading(true);
                    setError(null);

                    const response =
                        await getProductByBarcode({
                            barcode: cleanBarcode,
                            warehouseId,
                        });

                    const data =
                        response.data;

                    // ==================================
                    // VARIANT
                    // ==================================

                    if (
                        data.type ===
                        "VARIANT"
                    ) {
                        addToCart(
                            data.item
                        );

                        return;
                    }

                    // ==================================
                    // PRODUCT WITHOUT VARIANT
                    // ==================================

                    if (
                        data.type ===
                        "PRODUCT"
                    ) {
                        addToCart(
                            data.item
                        );

                        return;
                    }

                    // ==================================
                    // PRODUCT WITH VARIANTS
                    // ==================================

                    if (
                        data.type ===
                        "PRODUCT_WITH_VARIANTS"
                    ) {
                        setVariantSelection(
                            data
                        );
                    }
                } catch (error) {
                    setError(
                        error?.response
                            ?.data?.message ||
                            "Barcode not found"
                    );
                } finally {
                    setLoading(false);
                }
            },
            [
                warehouseId,
                addToCart,
            ]
        );

    const selectVariant =
        useCallback(
            (variant) => {
                addToCart(
                    variant
                );

                setVariantSelection(
                    null
                );
            },
            [addToCart]
        );

    const closeVariantSelection =
        useCallback(() => {
            setVariantSelection(
                null
            );
        }, []);

    return {
        scanBarcode,

        selectVariant,

        closeVariantSelection,

        variantSelection,

        loading,
        error,
    };
};