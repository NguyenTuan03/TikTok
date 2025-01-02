/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
export default function MenuItem({btn, icon, title, onClick = () => {} }) {
    return (
        <Stack
            sx={{
                ":hover": {
                    background: "#e7e7e7",
                },
                cursor: "pointer",
            }}
            p={"10px 0 10px 14px"}
            direction={"row"}            
            onClick={onClick}            
            alignItems={"center"}
        >
            <Box mr={1} fontSize={"14px"}>{icon}</Box>
            <Typography fontWeight={600} fontSize={"14px"} component={"span"}>{title}</Typography>
            {
                btn &&
                <Box ml={1} fontSize={"14px"}>{btn}</Box>
            }
        </Stack>
    );
}
