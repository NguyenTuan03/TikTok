/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CiMusicNote1 } from "react-icons/ci";
import { Videos } from "../context/VideoContext";
import InputSlider from "../slider/InputSlider";

export default function FooterVideo({ video}) {
    const MIN_VALUE = 0;
    const MAX_VALUE = Number(video.meta.playtime_seconds);
    const STEP = 0.0001;
    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const { videoRef } = useContext(Videos);

    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.currentTime = 0;
        }
        const handleTimeUpdate = () => {
            const currentTime = videoRef.current.currentTime;
            setTimeValueVideo(currentTime);
        };
        if (videoRef?.current) {
            videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
        }
        return () => {
            if (videoRef?.current) {
                videoRef?.current.removeEventListener(
                    "timeupdate",
                    handleTimeUpdate
                );
                videoRef?.current.pause();
            }
        };
    }, [videoRef]);
    const handleProgressChange = (e) => {
        const currentTime = Number(e);
        setTimeValueVideo(currentTime);
        videoRef.current.currentTime = currentTime;
    };
    return (
        <Stack position={"absolute"} bottom={"-7px"} left={0} right={0}>
            <Stack alignItems={"center"} direction={"row"}>
                <Typography
                    component={"span"}
                    fontWeight={"bold"}
                    color={"#fff"}
                    ml={2}
                    mb={1}
                >
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
                <InputSlider
                    value={timeValueVideo}
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    step={STEP}
                    onChange={handleProgressChange}
                    borderRadius="0"
                    height="16px"
                    heightX="2px"
                    heightOver="4px"
                />
            </Stack>
        </Stack>
    );
}
