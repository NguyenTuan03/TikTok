/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";

export default function FullScreenLayout({ children }) {
    return <Stack direction={"row"} width={"100%"} height={"100vh"}>{children}</Stack>;
}
