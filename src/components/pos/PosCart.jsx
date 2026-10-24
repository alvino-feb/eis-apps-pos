"use client";

import { usePosStore } from "../../stores/pos/usePosStore";
import { calculateCart } from "../../lib/pos/calculations";
import { formatCurrency } from "../../lib/pos/currency";

import PosCartItem from "./PosCartItem";

export default function PosCart() {
    const cart = usePosStore(
        (state) => state.cart
    );

    const openCheckout =
        usePosStore(
            (state) =>
                state.openCheckout
        );

    const clearCart = usePosStore(
        (state) => state.clearCart
    );

    const {
        subtotal,
        discount,
        tax,
        grandTotal,
    } = calculateCart(cart);

    return (
        <aside className="hidden w-80 shrink-0 flex-col border-l bg-white xl:flex 2xl:w-96">
            <div className="flex h-12 items-center justify-between border-b px-4">
                <div className="font-semibold">
                    Current Order
                </div>

                {cart.length > 0 && (
                    <button
                        type="button"
                        onClick={clearCart}
                        className="text-xs text-red-500"
                    >
                        Clear
                    </button>
                )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-400">
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
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            Subtotal
                        </span>

                        <span>
                            {formatCurrency(
                                subtotal
                            )}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            Discount
                        </span>

                        <span>
                            {formatCurrency(
                                discount
                            )}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            Tax
                        </span>

                        <span>
                            {formatCurrency(
                                tax
                            )}
                        </span>
                    </div>

                    <div className="my-3 border-t" />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>

                        <span>
                            {formatCurrency(
                                grandTotal
                            )}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    disabled={cart.length === 0}
                    onClick={openCheckout}
                    className="mt-4 h-12 w-full rounded-xl bg-gray-900 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                    Checkout
                </button>
            </div>
        </aside>
    );
}