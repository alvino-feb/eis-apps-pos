import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { login } from "../services/pos/authService";
import { useAuthStore } from "../stores/pos/useAuthStore";

export default function LoginPage() {

    const navigate = useNavigate();
    const setAuth =
        useAuthStore(
            (state) =>
                state.setAuth
        );
        
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit =
        async (event) => {

            event.preventDefault();

            if (!username || !password) {
                setError(
                    "Username dan password wajib diisi"
                );

                return;
            }

            try {
                setLoading(true);
                setError("");

                const response =
                    await login({
                        username,
                        password,
                    });

                setAuth({
                    user: response.data.user,
                    accessToken: response.data.accessToken,
                });

                navigate(
                    "/pos",
                    {
                        replace: true,
                    }
                );

            } catch (error) {

                setError(
                    error?.response
                        ?.data
                        ?.message ||
                    "Login gagal"
                );

            } finally {

                setLoading(false);

            }
        };

    return (
        <div className="flex min-h-dvh items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">
                        EIS POS
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Sign in to continue
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Username
                        </label>

                        <input
                            value={
                                username
                            }
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                            autoComplete="username"
                            className="h-11 w-full rounded-xl border px-3 outline-none focus:border-gray-900"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="current-password"
                            className="h-11 w-full rounded-xl border px-3 outline-none focus:border-gray-900"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="min-h-11 w-full rounded-xl bg-gray-900 px-4 font-medium text-white disabled:opacity-50"
                    >
                        {loading
                            ? "Signing in..."
                            : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}