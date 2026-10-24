"use client";

import { usePosStore } from "../../stores/pos/usePosStore";

export default function PosCategory({
    categories = [],
}) {
    const selectedCategoryId =
        usePosStore(
            (state) =>
                state.selectedCategoryId
        );

    const setCategory = usePosStore(
        (state) => state.setCategory
    );

    return (
        <aside className="hidden w-48 shrink-0 border-r bg-white lg:block">
            <div className="border-b px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Category
                </div>
            </div>

            <div className="space-y-1 p-2">
                <button
                    type="button"
                    onClick={() =>
                        setCategory(null)
                    }
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                        selectedCategoryId === null
                            ? "bg-gray-900 text-white"
                            : "hover:bg-gray-100"
                    }`}
                >
                    All Products
                </button>

                {categories.map(
                    (category) => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() =>
                                setCategory(
                                    category.id
                                )
                            }
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                                selectedCategoryId ===
                                category.id
                                    ? "bg-gray-900 text-white"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {category.name}
                        </button>
                    )
                )}
            </div>
        </aside>
    );
}