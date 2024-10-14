/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import { AudioPause, AudioPlayer, VolumeMute, VolumeUp } from "../../icon/Icon";
import VideoTrack from "./VideoTrack";

export default function FooterVideo({
    video,
    videoEle,
    handleMouseEnter,
    handleStop,
    handlePlay,
    playIndex,
    index,
    mute,
    setMute,
}) {
    const handleMuteToggle =() => {
        setMute(!mute);
        if (videoEle) {
            videoEle.muted = !mute;  
        }
    }
    return (
        <Box
            onMouseEnter={() => handleMouseEnter(index)}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            position={"absolute"}
            bottom={0}
            left={0}
            width={"100%"}
            height={"100px"}
            p={"67px 13px 17px"}
            sx={{
                background:
                    "linear-gradient(rgba(22, 24, 35, 0) 2.92%, rgba(22, 24, 35, 0.5) 98.99%)",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
            }}
        >
            <Stack direction={"row"} alignItems={"center"}>
                <Typography
                    component={"span"}
                    sx={{ cursor: "pointer" }}
                >
                    {playIndex === null || index !== playIndex ? (
                        <AudioPause onClick={() => handlePlay(index)}/>
                    ) : (
                        <AudioPlayer onClick={() => handleStop(index)}/>
                    )}
                </Typography>
                {playIndex === null || index !== playIndex ? (
                    <Typography
                        component={"span"}
                        fontSize={"20px"}
                        color={"#fff"}
                        ml={1}
                    >
                        {video?.views_count}
                    </Typography>
                ) : (
                    <></>
                )}
            </Stack>
            {index !== playIndex ? (
                <></>
            ) : (
                <Typography
                    component={"span"}
                    sx={{ cursor: "pointer" }}
                    onClick={handleMuteToggle}
                >
                    {mute ? <VolumeMute /> : <VolumeUp />}
                </Typography>
            )}
            <VideoTrack
                videoEle={videoEle}
                video={video}
                playIndex={playIndex}
            />
        </Box>
    );
}
