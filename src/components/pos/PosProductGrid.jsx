"use client";

import { useMemo } from "react";

import { usePosStore } from "../../stores/pos/usePosStore";
import PosProductCard from "./PosProductCard";

export default function PosProductGrid({
    products = [],
}) {
    const search = usePosStore(
        (state) => state.search
    );

    const selectedCategoryId =
        usePosStore(
            (state) =>
                state.selectedCategoryId
        );

    const filteredProducts =
        useMemo(() => {
            const keyword =
                search
                    .trim()
                    .toLowerCase();

            return products.filter(
                (product) => {
                    const matchesSearch =
                        !keyword ||
                        product.productName
                            .toLowerCase()
                            .includes(keyword) ||
                        product.code
                            ?.toLowerCase()
                            .includes(keyword) ||
                        product.barcode
                            ?.toLowerCase()
                            .includes(keyword) ||
                        product.sku
                            ?.toLowerCase()
                            .includes(keyword);

                    const matchesCategory =
                        !selectedCategoryId ||
                        product.categoryId ===
                            selectedCategoryId;

                    return (
                        matchesSearch &&
                        matchesCategory
                    );
                }
            );
        }, [
            products,
            search,
            selectedCategoryId,
        ]);

    return (
        <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredProducts.map(
                (product) => (
                    <PosProductCard
                        key={`${product.productId}-${product.productVariantId ?? "default"}`}
                        product={product}
                    />
                )
            )}

            {filteredProducts.length ===
                0 && (
                <div className="col-span-full flex min-h-60 items-center justify-center text-sm text-gray-400">
                    Product tidak ditemukan
                </div>
            )}
        </div>
    );
}