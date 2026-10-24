"use client";

import { useState } from "react";

import { usePosStore } from "../../stores/pos/usePosStore";
import { calculateCart } from "../../lib/pos/calculations";
import { formatCurrency } from "../../lib/pos/currency";

const PAYMENT_METHODS = [
    {
        code: "CASH",
        name: "Cash",
    },
    {
        code: "QRIS",
        name: "QRIS",
    },
    {
        code: "DEBIT",
        name: "Debit",
    },
    {
        code: "CREDIT_CARD",
        name: "Credit Card",
    },
];

export default function PosCheckoutModal() {
    const cart = usePosStore(
        (state) => state.cart
    );

    const isCheckoutOpen =
        usePosStore(
            (state) =>
                state.isCheckoutOpen
        );

    const closeCheckout =
        usePosStore(
            (state) =>
                state.closeCheckout
        );

    const clearCart = usePosStore(
        (state) => state.clearCart
    );

    const [method, setMethod] =
        useState("CASH");

    const [paidAmount, setPaidAmount] =
        useState("");

    if (!isCheckoutOpen) {
        return null;
    }

    const {
        grandTotal,
    } = calculateCart(cart);

    const paid =
        Number(paidAmount) || 0;

    const change = Math.max(
        paid - grandTotal,
        0
    );

    const canPay =
        method !== "CASH"
            ? true
            : paid >= grandTotal;

    const handleSubmit = async () => {
        if (!canPay) {
            return;
        }

        /*
         * Nanti:
         *
         * await checkout({
         *     items: cart,
         *     payment: {
         *         method,
         *         amount:
         *             method === "CASH"
         *                 ? paid
         *                 : grandTotal
         *     }
         * });
         */

        clearCart();
        closeCheckout();

        setPaidAmount("");
        setMethod("CASH");
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
            <div className="max-h-[95vh] w-full overflow-y-auto rounded-t-2xl bg-white sm:max-w-lg sm:rounded-2xl">
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <div>
                        <div className="text-lg font-semibold">
                            Checkout
                        </div>

                        <div className="text-xs text-gray-500">
                            Complete payment
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={
                            closeCheckout
                        }
                        className="rounded-lg px-3 py-2 hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-5 p-5">
                    <div className="rounded-xl bg-gray-50 p-4">
                        <div className="text-sm text-gray-500">
                            Total
                        </div>

                        <div className="mt-1 text-3xl font-bold">
                            {formatCurrency(
                                grandTotal
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 text-sm font-medium">
                            Payment Method
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {PAYMENT_METHODS.map(
                                (item) => (
                                    <button
                                        key={
                                            item.code
                                        }
                                        type="button"
                                        onClick={() => {
                                            setMethod(
                                                item.code
                                            );

                                            if (
                                                item.code !==
                                                "CASH"
                                            ) {
                                                setPaidAmount(
                                                    String(
                                                        grandTotal
                                                    )
                                                );
                                            }
                                        }}
                                        className={`rounded-xl border px-3 py-3 text-sm font-medium ${
                                            method ===
                                            item.code
                                                ? "border-gray-900 bg-gray-900 text-white"
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        {
                                            item.name
                                        }
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {method === "CASH" && (
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Paid Amount
                            </label>

                            <input
                                type="number"
                                inputMode="decimal"
                                value={
                                    paidAmount
                                }
                                onChange={(
                                    event
                                ) =>
                                    setPaidAmount(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="0"
                                className="h-12 w-full rounded-xl border px-4 text-right text-xl font-semibold outline-none focus:border-gray-900"
                            />

                            <div className="mt-3 flex justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm">
                                <span className="text-gray-500">
                                    Change
                                </span>

                                <span className="font-semibold">
                                    {formatCurrency(
                                        change
                                    )}
                                </span>
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        disabled={!canPay}
                        onClick={
                            handleSubmit
                        }
                        className="h-12 w-full rounded-xl bg-gray-900 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        Complete Payment
                    </button>
                </div>
            </div>
        </div>
    );
}