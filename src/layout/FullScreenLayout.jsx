/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import { useContext } from "react";
import { Auth } from "../component/context/AuthContext";
import DeleteForm from "../component/form/DeleteForm";

export default function FullScreenLayout({ children }) {
    const {openFormDelete} = useContext(Auth)
    return (
        <Stack direction={"row"} width={"100%"} height={"100vh"}>
            {children}
            {
                (openFormDelete) && (
                    <Box position={"fixed"} top={0} left={0} width={"100%"} height={"100%"} bgcolor={"rgba(0, 0, 0, 0.5)"} zIndex={9999}>
                        {openFormDelete && <DeleteForm/>}
                    </Box>
                )
            }
        </Stack>
    );
}
