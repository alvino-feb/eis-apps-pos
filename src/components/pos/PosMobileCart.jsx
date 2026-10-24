"use client";

import { usePosStore } from "../../stores/pos/usePosStore";
import { calculateCart } from "../../lib/pos/calculations";
import { formatCurrency } from "../../lib/pos/currency";

import PosCartItem from "./PosCartItem";

export default function PosMobileCart() {
    const cart = usePosStore(
        (state) => state.cart
    );

    const isCartOpen =
        usePosStore(
            (state) => state.isCartOpen
        );

    const closeCart =
        usePosStore(
            (state) => state.closeCart
        );

    const openCheckout =
        usePosStore(
            (state) => state.openCheckout
        );

    if (!isCartOpen) {
        return null;
    }

    const {
        grandTotal,
    } = calculateCart(cart);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-white xl:hidden">
            <div className="flex h-14 items-center justify-between border-b px-4">
                <div className="font-semibold">
                    Current Order
                </div>

                <button
                    type="button"
                    onClick={closeCart}
                    className="rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                    ✕
                </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        Cart masih kosong
                    </div>
                ) : (
                    cart.map((item) => (
                        <PosCartItem
                            key={
                                item.cartItemId
                            }
                            item={item}
                        />
                    ))
                )}
            </div>

            <div className="border-t p-4">
                <div className="mb-3 flex justify-between text-lg font-bold">
                    <span>Total</span>

                    <span>
                        {formatCurrency(
                            grandTotal
                        )}
                    </span>
                </div>

                <button
                    type="button"
                    disabled={cart.length === 0}
                    onClick={openCheckout}
                    className="h-12 w-full rounded-xl bg-gray-900 font-semibold text-white disabled:bg-gray-300"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}