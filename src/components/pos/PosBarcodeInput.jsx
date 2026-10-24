"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

export default function PosBarcodeInput({
    onScan,
    loading = false,
}) {
    const inputRef = useRef(null);

    const [value, setValue] =
        useState("");

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (
        event
    ) => {
        if (
            event.key === "Enter"
        ) {
            event.preventDefault();

            const barcode =
                value.trim();

            if (barcode) {
                onScan(barcode);
            }

            setValue("");

            setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
        }
    };

    return (
        <input
            ref={inputRef}
            value={value}
            onChange={(event) =>
                setValue(
                    event.target.value
                )
            }
            onKeyDown={handleKeyDown}
            placeholder={
                loading
                    ? "Scanning..."
                    : "Search product / scan barcode..."
            }
            className="h-11 w-full rounded-xl border bg-white px-4 text-sm outline-none focus:border-gray-900"
        />
    );
}