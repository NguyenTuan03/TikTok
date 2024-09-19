import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThemeContext from "./component/context/ThemeContext.jsx";
import AuthContext from "./component/accountItem/AuthContext.jsx";
import GlobalStyle from "./component/globalStyle/GlobalStyle.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        <GlobalStyle>
            <ThemeContext>
                <AuthContext>
                    <App />
                </AuthContext>
            </ThemeContext>
        </GlobalStyle>
    // </React.StrictMode>
);
