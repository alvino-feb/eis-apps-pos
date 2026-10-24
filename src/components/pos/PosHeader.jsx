"use client";

import { usePosStore } from "../../stores/pos/usePosStore";
import { formatCurrency } from "../../lib/pos/currency";
import { calculateCart } from "../../lib/pos/calculations";

export default function PosHeader({
    outletName = "Outlet",
    cashierName = "Cashier",
}) {
    const cart = usePosStore(
        (state) => state.cart
    );

    const openCart = usePosStore(
        (state) => state.openCart
    );

    const { grandTotal, totalItems } =
        calculateCart(cart);

    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b bg-white px-3 md:px-5">
            <div className="flex min-w-0 items-center gap-3">
                <div className="text-lg font-bold">
                    EIS POS
                </div>

                <div className="hidden h-5 w-px bg-gray-200 md:block" />

                <div className="hidden text-sm text-gray-500 md:block">
                    {outletName}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden text-right lg:block">
                    <div className="text-sm font-medium">
                        {cashierName}
                    </div>

                    <div className="flex items-center justify-end gap-1 text-xs text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Online
                    </div>
                </div>

                <button
                    type="button"
                    onClick={openCart}
                    className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                >
                    <span className="md:hidden">
                        🛒
                    </span>

                    <span className="hidden md:inline">
                        Cart
                    </span>

                    {totalItems > 0 && (
                        <span className="ml-2 rounded-full bg-black px-2 py-0.5 text-xs text-white">
                            {totalItems}
                        </span>
                    )}

                    <span className="ml-2 hidden md:inline">
                        {formatCurrency(grandTotal)}
                    </span>
                </button>
            </div>
        </header>
    );
}