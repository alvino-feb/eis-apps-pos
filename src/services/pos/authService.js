import api from "../../lib/axios";

export const login = async ({
    username,
    password,
}) => {
    const response =
        await api.post(
            "/auth/login",
            {
                username,
                password,
            }
        );

    return response.data;
};

export const logout = async () => {
    await api.post(
        "/auth/logout"
    );
};

export const refreshToken = async () => {
    const response =
        await api.post(
            "/auth/refresh-token"
        );

    return response.data;
};