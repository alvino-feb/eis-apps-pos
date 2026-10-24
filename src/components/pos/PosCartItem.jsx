"use client";

import { usePosStore } from "../../stores/pos/usePosStore";
import { formatCurrency } from "../../lib/pos/currency";

export default function PosCartItem({
    item,
}) {
    const increaseQty =
        usePosStore(
            (state) =>
                state.increaseQty
        );

    const decreaseQty =
        usePosStore(
            (state) =>
                state.decreaseQty
        );

    const removeFromCart =
        usePosStore(
            (state) =>
                state.removeFromCart
        );

    const subtotal =
        Number(item.price) *
        Number(item.qty);

    return (
        <div className="border-b px-4 py-3">
            <div className="flex gap-3">
                <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                        {item.productName}
                    </div>

                    {item.variantName && (
                        <div className="mt-0.5 text-xs text-gray-500">
                            {item.variantName}
                        </div>
                    )}

                    <div className="mt-1 text-xs text-gray-500">
                        {formatCurrency(
                            item.price
                        )}
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-sm font-semibold">
                        {formatCurrency(
                            subtotal
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
                <button
                    type="button"
                    onClick={() =>
                        removeFromCart(
                            item.cartItemId
                        )
                    }
                    className="text-xs text-red-500 hover:text-red-700"
                >
                    Remove
                </button>

                <div className="flex items-center rounded-lg border">
                    <button
                        type="button"
                        onClick={() =>
                            decreaseQty(
                                item.cartItemId
                            )
                        }
                        className="h-8 w-8 hover:bg-gray-100"
                    >
                        −
                    </button>

                    <div className="w-8 text-center text-sm">
                        {item.qty}
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            increaseQty(
                                item.cartItemId
                            )
                        }
                        className="h-8 w-8 hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}