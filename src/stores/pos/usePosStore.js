import { create } from "zustand";

const initialState = {
    cart: [],
    selectedCategoryId: null,
    search: "",
    isCartOpen: false,
    isCheckoutOpen: false,
};

export const usePosStore = create((set, get) => ({
    ...initialState,

    setSearch: (search) => {
        set({ search });
    },

    setCategory: (categoryId) => {
        set({
            selectedCategoryId: categoryId,
        });
    },

    addToCart: (product) => {
        const cart = get().cart;

        const existingIndex = cart.findIndex(
            (item) =>
                item.productId === product.productId &&
                item.productVariantId === product.productVariantId
        );

        if (existingIndex >= 0) {
            const updated = [...cart];

            updated[existingIndex] = {
                ...updated[existingIndex],
                qty: updated[existingIndex].qty + 1,
            };

            set({
                cart: updated,
            });

            return;
        }

        set({
            cart: [
                ...cart,
                {
                    cartItemId: crypto.randomUUID(),

                    productId: product.productId,
                    productVariantId:
                        product.productVariantId ?? null,

                    productName: product.productName,
                    variantName:
                        product.variantName ?? null,

                    sku: product.sku ?? null,
                    barcode: product.barcode ?? null,

                    qty: 1,

                    price: Number(product.price),
                    costPrice: product.costPrice
                        ? Number(product.costPrice)
                        : null,
                },
            ],
        });
    },

    removeFromCart: (cartItemId) => {
        set({
            cart: get().cart.filter(
                (item) => item.cartItemId !== cartItemId
            ),
        });
    },

    increaseQty: (cartItemId) => {
        set({
            cart: get().cart.map((item) =>
                item.cartItemId === cartItemId
                    ? {
                          ...item,
                          qty: item.qty + 1,
                      }
                    : item
            ),
        });
    },

    decreaseQty: (cartItemId) => {
        const cart = get().cart;

        const item = cart.find(
            (item) => item.cartItemId === cartItemId
        );

        if (!item) {
            return;
        }

        if (item.qty <= 1) {
            set({
                cart: cart.filter(
                    (item) =>
                        item.cartItemId !== cartItemId
                ),
            });

            return;
        }

        set({
            cart: cart.map((item) =>
                item.cartItemId === cartItemId
                    ? {
                          ...item,
                          qty: item.qty - 1,
                      }
                    : item
            ),
        });
    },

    setQty: (cartItemId, qty) => {
        const parsedQty = Number(qty);

        if (
            !Number.isFinite(parsedQty) ||
            parsedQty <= 0
        ) {
            return;
        }

        set({
            cart: get().cart.map((item) =>
                item.cartItemId === cartItemId
                    ? {
                          ...item,
                          qty: parsedQty,
                      }
                    : item
            ),
        });
    },

    clearCart: () => {
        set({
            cart: [],
        });
    },

    openCart: () => {
        set({
            isCartOpen: true,
        });
    },

    closeCart: () => {
        set({
            isCartOpen: false,
        });
    },

    openCheckout: () => {
        if (get().cart.length === 0) {
            return;
        }

        set({
            isCheckoutOpen: true,
            isCartOpen: false,
        });
    },

    closeCheckout: () => {
        set({
            isCheckoutOpen: false,
        });
    },

    reset: () => {
        set(initialState);
    },
}));

// import { create } from "zustand";

// export const usePosStore = create(
//     (set) => ({
//         // ==========================================
//         // SEARCH
//         // ==========================================

//         search: "",

//         setSearch: (search) =>
//             set({ search }),

//         // ==========================================
//         // CATEGORY
//         // ==========================================

//         selectedCategoryId: null,

//         setSelectedCategoryId: (
//             selectedCategoryId
//         ) =>
//             set({
//                 selectedCategoryId,
//             }),

//         // ==========================================
//         // CART
//         // ==========================================

//         cart: [],

//         addToCart: (item) =>
//             set((state) => {
//                 const existing =
//                     state.cart.find(
//                         (cartItem) =>
//                             cartItem.productId ===
//                                 item.productId &&
//                             cartItem.productVariantId ===
//                                 item.productVariantId
//                     );

//                 if (existing) {
//                     return {
//                         cart:
//                             state.cart.map(
//                                 (cartItem) =>
//                                     cartItem === existing
//                                         ? {
//                                               ...cartItem,
//                                               qty:
//                                                   cartItem.qty +
//                                                   1,
//                                           }
//                                         : cartItem
//                             ),
//                     };
//                 }

//                 return {
//                     cart: [
//                         ...state.cart,
//                         {
//                             ...item,
//                             qty: 1,
//                         },
//                     ],
//                 };
//             }),

//         removeFromCart: (
//             productId,
//             productVariantId
//         ) =>
//             set((state) => ({
//                 cart:
//                     state.cart.filter(
//                         (item) =>
//                             !(
//                                 item.productId ===
//                                     productId &&
//                                 item.productVariantId ===
//                                     productVariantId
//                             )
//                     ),
//             })),

//         updateCartQty: (
//             productId,
//             productVariantId,
//             qty
//         ) =>
//             set((state) => ({
//                 cart:
//                     state.cart.map((item) =>
//                         item.productId ===
//                                 productId &&
//                             item.productVariantId ===
//                                 productVariantId
//                             ? {
//                                   ...item,
//                                   qty,
//                               }
//                             : item
//                     ),
//             })),

//         clearCart: () =>
//             set({
//                 cart: [],
//             }),
//     })
// );