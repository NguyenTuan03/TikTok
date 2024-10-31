/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";

export default function ButtonIcon({
    onClick = () =>{},
    height = "40px",
    width = "40px",
    left,
    top,
    right,
    bottom,
    children,
    middle,
    direction = "row"
}) {
    return (
        <Stack
            onClick={onClick}
            direction={direction}
            alignItems={"center"}
            justifyContent={"center"}
            width={width}
            height={height}
            bgcolor={"rgba(84, 84, 84, 0.5)"}
            borderRadius={"50%"}
            border={"none"}
            position={"absolute"}
            top={top}
            left={left}
            right={right}
            bottom={bottom}
            zIndex={999}
            sx={{ cursor: "pointer", transform:middle && 'translateY(-50%)' }}
        >
            {children}
        </Stack>
    );
}
