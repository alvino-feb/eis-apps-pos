export const calculateCart = (cart) => {
    const subtotal = cart.reduce(
        (total, item) =>
            total +
            Number(item.price) *
                Number(item.qty),
        0
    );

    const discount = 0;
    const tax = 0;

    const grandTotal =
        subtotal -
        discount +
        tax;

    const totalItems = cart.reduce(
        (total, item) =>
            total + Number(item.qty),
        0
    );

    return {
        subtotal,
        discount,
        tax,
        grandTotal,
        totalItems,
    };
};