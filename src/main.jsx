import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThemeContext from "./component/context/ThemeContext.jsx";
import GlobalStyle from "./component/globalStyle/GlobalStyle.jsx";
import AuthContext from "./component/context/AuthContext.jsx";
import VideoContext from "./component/context/VideoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        <GlobalStyle>
            <ThemeContext>
                <VideoContext>
                    <AuthContext>
                        <App />
                    </AuthContext>
                </VideoContext>
            </ThemeContext>
        </GlobalStyle>
    // </React.StrictMode>
);
