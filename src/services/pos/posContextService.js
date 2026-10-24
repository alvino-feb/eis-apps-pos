import api from "../../lib/axios";

export const getPosContext =
    async ({
        deviceCode,
    }) => {
        const response =
            await api.get(
                "/pos/context",
                {
                    params: {
                        deviceCode,
                    },
                }
            );

        return response.data;
    };