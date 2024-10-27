/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

export default function Wrapper({ children, width, height,minWidth,maxHeight }) {
    return (
        <Box
            sx={{
                width: width,
                minWidth:minWidth,
                height: height,
                maxHeight:maxHeight,
                display: 'flex',
                flexDirection:"column",
                padding: "8px 0",
                bgcolor: "rgb(255, 255, 255)",
                boxShadow:"rgba(0, 0, 0, 0.12) 0px 2px 12px",
                borderRadius:"8px",
                boxSizing: "border-box",
                overflow: "hidden",
                zIndex:1
            }}
        >
            {children}
        </Box>
    );
}
