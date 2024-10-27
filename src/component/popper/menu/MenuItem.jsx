/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
export default function MenuItem({ icon, title, id, onClick = () => {} }) {
    return (
        <Stack
            sx={{
                ":hover": {
                    background: "#e7e7e7",
                },
                cursor: "pointer",
            }}
            p={"10px 0 10px 14px"}
            key={id}
            direction={"row"}
            onClick={onClick}
        >
            <Box mr={2}>{icon}</Box>
            <Typography component={"span"}>{title}</Typography>
        </Stack>
    );
}
