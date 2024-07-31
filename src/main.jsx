import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThemeContext from "./component/context/ThemeContext.jsx";
import AuthContext from "./component/accountItem/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeContext>
            <AuthContext>
                <App />
            </AuthContext>
        </ThemeContext>
    </React.StrictMode>
);
