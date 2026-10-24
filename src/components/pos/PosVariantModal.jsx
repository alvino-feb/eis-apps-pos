"use client";

export default function PosVariantModal({
    data,
    onSelect,
    onClose,
}) {
    if (!data) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center">
            <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-lg font-semibold">
                            {data.product.productName}
                        </div>

                        <div className="text-sm text-gray-500">
                            Pilih variant
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            min-h-11
                            min-w-11
                            rounded-xl
                            border
                            text-lg
                        "
                    >
                        ×
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    {data.variants.map(
                        (variant) => {
                            const stock =
                                Number(
                                    variant.stock
                                );

                            const disabled =
                                variant.trackInventory &&
                                stock <= 0;

                            return (
                                <button
                                    key={
                                        variant.productVariantId
                                    }
                                    type="button"
                                    disabled={
                                        disabled
                                    }
                                    onClick={() =>
                                        onSelect(
                                            variant
                                        )
                                    }
                                    className={`
                                        min-h-24
                                        rounded-xl
                                        border
                                        p-3
                                        text-left
                                        ${
                                            disabled
                                                ? "cursor-not-allowed opacity-40"
                                                : "hover:border-gray-900"
                                        }
                                    `}
                                >
                                    <div className="font-medium">
                                        {
                                            variant.variantName
                                        }
                                    </div>

                                    <div className="mt-1 text-sm">
                                        Rp{" "}
                                        {Number(
                                            variant.price
                                        ).toLocaleString(
                                            "id-ID"
                                        )}
                                    </div>

                                    {variant.trackInventory && (
                                        <div className="mt-1 text-xs text-gray-500">
                                            Stock:{" "}
                                            {stock}
                                        </div>
                                    )}
                                </button>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
}