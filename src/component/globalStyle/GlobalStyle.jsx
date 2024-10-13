import { Box } from "@mui/material";
import PropTypes from "prop-types";

export default function GlobalStyle({ children }) {
    GlobalStyle.propTypes = {
        children: PropTypes.node,
    };
    return <Box>{children}</Box>;
}
