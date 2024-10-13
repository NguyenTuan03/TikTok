/* eslint-disable react/prop-types */
import { Box, Slider, Stack, Typography } from "@mui/material";
import { CiMusicNote1 } from "react-icons/ci";

export default function FooterVideo({video, progress, handleProgressChange}) {
    return (
        <Stack position={"absolute"} bottom={"-13px"} left={0} right={0}>
            <Stack alignItems={"center"} direction={"row"}>
                <Typography component={"span"} fontWeight={"bold"} color={"#fff"} ml={2} mb={1}>
                    {video.user.nickname}
                </Typography>
            </Stack>
            <Stack alignItems={"center"} direction={"row"}>
                <Typography component={"span"} color={"#fff"} ml={2} mb={1}>
                    {video.description}
                </Typography>
            </Stack>
            {video.music && (
                <Stack alignItems={"center"} direction={"row"}>
                    <Box
                        color={"#fff"}
                        ml={2}
                        mb={1}
                        display={"flex"}
                        alignItems={"center"}
                    >
                        {" "}
                        <CiMusicNote1
                            color="#fff"
                            style={{ marginRight: "8px" }}
                        />{" "}
                        {video.music}
                    </Box>
                </Stack>
            )}
            <Stack alignItems={"center"} direction={"row"} width={"100%"}>
                <Slider
                    value={progress[video.id] || 0}
                    onChange={(e) => handleProgressChange(e, video)}
                    min={0}
                    max={100}
                    step={1}
                    sx={{
                        width: "100%",
                        "& .MuiSlider-thumb": {
                            width: "6px",
                            height: "6px",
                            backgroundColor: "#fff",
                        },
                        "& .MuiSlider-rail": {
                            backgroundColor: "rgb(126 120 119)",
                        },
                        "& .MuiSlider-track": {
                            backgroundColor: "rgb(254 44 85)",
                            border: "none",
                        },
                    }}
                />
            </Stack>
        </Stack>
    );
}
