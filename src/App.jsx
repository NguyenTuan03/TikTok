import { Box, useTheme } from "@mui/material";
import { Fragment, useContext } from "react";
import { ColorModeContext } from "./component/context/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import publicRoutes from "./routes/Routes";
import MainLayout from "./layout/MainLayout";

function App() {
    // const theme = useTheme();
    // const colorMode = useContext(ColorModeContext);
    return (
        <Router>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.default",
                    color: "text.primary",
                    borderRadius: 1,
                }}
            >
                <Routes>
                    {publicRoutes.map((item, index) => {
                        let Layout = MainLayout;
                        if (item.layout) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = item.component;
                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Box>
        </Router>
    );
}

export default App;
