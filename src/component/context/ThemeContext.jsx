import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import PropTypes from 'prop-types';
export const ColorModeContext = createContext();
export default function ThemeContext({ children }) {
    const [mode, setMode] = useState("light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );
    const value = {
        colorMode,
        theme,
    };
    return (
        <ColorModeContext.Provider value={value}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
}
ThemeContext.propTypes = {
    children: PropTypes.node.isRequired
}