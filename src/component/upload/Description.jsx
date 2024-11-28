import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Description() {
    const [text, setText] = useState("");    

    const handleChange = (event) => {
        const newText = event.target.value;        
        setText(newText);        
    };
    return (
        <>
            <Box flex={"1 1 0%"}>
                <Typography fontWeight={500} mb={"8px"} fontSize={"16px"}>
                    Description
                </Typography>
                <Box position={"relative"}>
                    <Typography                    
                        component={"textarea"}                        
                        value={text}
                        onChange={handleChange}
                        marginTop={"16px"}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                            padding:"16px 16px 32px 16px",
                            width: "100%",
                            height: "100px",
                            outline: "none",
                            fontSize:"16px"
                        }}
                        maxLength={4000}
                        border={"none"}
                        borderRadius={"4px"}
                    />
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        position={"absolute"}
                        bottom={"14px"}
                        padding={"0 12px"}
                        justifyContent={"space-between"}
                        width={"100%"}
                    >
                        <Stack direction={"row"} alignItems={"center"} color={"rgba(0,0,0,0.65)"} gap={1}>
                            <Typography fontSize={"14px"}># Hashtags</Typography>
                            <Typography fontSize={"14px"}>@ Mention</Typography>
                        </Stack>
                        <Typography color={"rgba(0,0,0,0.65)"}>{text.length} / 4000</Typography>
                    </Stack>
                </Box>
            </Box>
        </>
    );
}
