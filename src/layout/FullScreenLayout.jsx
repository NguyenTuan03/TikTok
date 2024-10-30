/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";

export default function FullScreenLayout({ children }) {
    return <Stack direction={"row"}>{children}</Stack>;
}
