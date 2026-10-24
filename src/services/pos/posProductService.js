import api from "../../lib/axios";

export const getPosProducts =
    async ({
        warehouseId,
        search = "",
        categoryId,
        page = 1,
        limit = 50,
    }) => {
        const response =
            await api.get(
                "/pos/products",
                {
                    params: {
                        warehouseId,
                        search,
                        categoryId,
                        page,
                        limit,
                    },
                }
            );

        return response.data;
    };