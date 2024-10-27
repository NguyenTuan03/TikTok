/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import { MdArrowBackIos } from "react-icons/md";

export default function Header({ title, onBack = () => {} }) {
    return (
        <Stack
            p={"10px 0 10px 14px"}
            direction={"row"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
        >
            <Box
                onClick={onBack}
                mr={2}
            >
                <MdArrowBackIos />
            </Box>
            <Typography component={"span"}>{title}</Typography>
        </Stack>
    );
}
