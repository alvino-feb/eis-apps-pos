// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     Navigate,
// } from "react-router-dom";

// import PosPage from "../pages/Pos";

// export default function AppRouter() {
//     return (
//         <BrowserRouter>
//             <Routes>

//                 <Route
//                     path="/pos"
//                     element={<PosPage />}
//                 />

//                 <Route
//                     path="*"
//                     element={
//                         <Navigate
//                             to="/pos"
//                             replace
//                         />
//                     }
//                 />

//             </Routes>
//         </BrowserRouter>
//     );
// }

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import LoginPage
    from "../pages/Login";

import PosPage
    from "../pages/Pos";

import ProtectedRoute
    from "./ProtectedRoute";

export default function AppRouter() {

    return (
        <BrowserRouter>

            <Routes>

                {/* ========================= */}
                {/* PUBLIC */}
                {/* ========================= */}

                <Route
                    path="/login"
                    element={
                        <LoginPage />
                    }
                />

                {/* ========================= */}
                {/* PROTECTED */}
                {/* ========================= */}

                <Route
                    element={
                        <ProtectedRoute />
                    }
                >

                    <Route
                        path="/pos"
                        element={
                            <PosPage />
                        }
                    />

                </Route>

                {/* ========================= */}
                {/* DEFAULT */}
                {/* ========================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/pos"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}