const STORAGE_KEY =
    "eis_pos_device_code";

export const getDeviceCode = () => {
    if (
        typeof window ===
        "undefined"
    ) {
        return null;
    }

    return localStorage.getItem(
        STORAGE_KEY
    );
};

export const setDeviceCode = (
    deviceCode
) => {
    if (
        typeof window ===
        "undefined"
    ) {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        deviceCode
    );
};

export const clearDeviceCode = () => {
    if (
        typeof window ===
        "undefined"
    ) {
        return;
    }

    localStorage.removeItem(
        STORAGE_KEY
    );
};