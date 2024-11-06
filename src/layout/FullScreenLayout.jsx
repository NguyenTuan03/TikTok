/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
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
                    <>
                        {openFormDelete && <DeleteForm/>}
                    </>
                )
            }
        </Stack>
    );
}
