import PosHeader from "../components/pos/PosHeader";
import PosCategory from "../components/pos/PosCategory";
import PosProductGrid from "../components/pos/PosProductGrid";
import PosCart from "../components/pos/PosCart";
import PosMobileCart from "../components/pos/PosMobileCart";
import PosCheckoutModal from "../components/pos/PosCheckoutModal";

import PosBarcodeInput from "../components/pos/PosBarcodeInput";
import PosVariantModal from "../components/pos/PosVariantModal";

import { usePosStore } from "../stores/pos/usePosStore";
import { usePosContext } from "../hooks/pos/usePosContext";
import { usePosProducts } from "../hooks/pos/usePosProducts";
import { usePosBarcode } from "../hooks/pos/usePosBarcode";

export default function PosPage() {

    const search =
        usePosStore(
            (state) => state.search
        );

    const setSearch =
        usePosStore(
            (state) => state.setSearch
        );

    const selectedCategoryId =
        usePosStore(
            (state) =>
                state.selectedCategoryId
        );

    const {
        context,
        loading: contextLoading,
        error: contextError,
    } = usePosContext();

    const {
        products,
        loading: productsLoading,
        error: productsError,
    } = usePosProducts({
        warehouseId: context?.warehouse?.id,
        search,
        categoryId: selectedCategoryId,
    });

    const {
        scanBarcode,
        selectVariant,
        closeVariantSelection,
        variantSelection,
        loading: barcodeLoading,
        error: barcodeError,
    } = usePosBarcode({
        warehouseId:
            context?.warehouse?.id,
    });

    if (contextLoading) {
        return (
            <div className="flex h-dvh items-center justify-center bg-gray-100">
                Loading POS...
            </div>
        );
    }

    // if (contextError) {
    //     return (
    //         <div className="flex h-dvh items-center justify-center bg-gray-100 p-4">
    //             <div className="w-full max-w-md rounded-xl border bg-white p-6">
    //                 <div className="text-lg font-semibold">
    //                     POS tidak siap
    //                 </div>

    //                 <div className="mt-2 text-sm text-red-500">
    //                     {contextError}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-gray-100">

            <PosHeader
                outletName={
                    context?.outlet?.name
                }
                cashierName={
                    context?.cashier?.name ??
                    "Cashier"
                }
            />

            <div className="flex min-h-0 flex-1">

                <PosCategory
                    categories={[]}
                />

                <main className="min-w-0 flex-1 overflow-y-auto">

                    <div className="sticky top-0 z-10 border-b bg-gray-100/95 p-3 backdrop-blur">
                        <PosBarcodeInput
                            onScan={scanBarcode}
                            loading={barcodeLoading}
                        />

                        {barcodeError && (
                            <div className="mt-2 text-xs text-red-500">
                                {barcodeError}
                            </div>
                        )}

                    </div>

                    {productsLoading ? (
                        <div className="flex min-h-60 items-center justify-center text-sm text-gray-400">
                            Loading products...
                        </div>
                    ) : productsError ? (
                        <div className="p-4 text-sm text-red-500">
                            {productsError}
                        </div>
                    ) : (
                        <PosProductGrid
                            products={products}
                        />
                    )}

                </main>

                <PosCart />

            </div>

            <PosMobileCart />

            <PosCheckoutModal />

            <PosVariantModal
                data={variantSelection}
                onSelect={selectVariant}
                onClose={
                    closeVariantSelection
                }
            />

        </div>
    );
}