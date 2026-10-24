"use client";

import { usePosStore } from "../../stores/pos/usePosStore";
import { formatCurrency } from "../../lib/pos/currency";

export default function PosProductCard({
    product,
}) {
    const addToCart = usePosStore(
        (state) => state.addToCart
    );

    const isOutOfStock =
        product.trackInventory &&
        Number(product.stock ?? 0) <= 0;

    return (
        <button
            type="button"
            disabled={isOutOfStock}
            onClick={() =>
                addToCart(product)
            }
            className="group overflow-hidden rounded-xl border bg-white text-left transition hover:border-gray-400 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
            <div className="aspect-square bg-gray-100">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-3xl text-gray-300">
                        📦
                    </div>
                )}
            </div>

            <div className="p-3">
                <div className="line-clamp-2 min-h-10 text-sm font-medium">
                    {product.productName}
                </div>

                {product.variantName && (
                    <div className="mt-1 text-xs text-gray-500">
                        {product.variantName}
                    </div>
                )}

                <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">
                        {formatCurrency(
                            product.price
                        )}
                    </span>

                    {product.trackInventory && (
                        <span className="text-xs text-gray-400">
                            {product.stock}
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}