/* eslint-disable react/prop-types */
import { Box, rgbToHex, Stack, Typography } from "@mui/material";
import Search from "../../component/search/Search";
import { useRef, useState } from "react";
import InputSlider from "../../component/slider/InputSlider";
import {
    ArrowDown,
    ArrowUp,
    CloseIcon,
    EllipsisHorizon,
    VolumeUp,
} from "../../component/icon/Icon";
import ButtonIcon from "../../component/icon/ButtonIcon";
import VolumeVideo from "../../component/volume/VolumeVideo";

export default function Video({
    onPrevPage,
    onNextPage,
    data,
    position,
    listVideo,
}) {
    console.log(data);
    const MIN_VALUE = 0;
    const MAX_VALUE = Number(data?.meta?.playtime_seconds);
    const STEP = 0.001;
    const videoRef = useRef();
    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const [isShowTrack, setIsShowTrack] = useState(false);
    return (
        <Box
            position={"relative"}
            maxWidth={"100%"}
            padding={"0 80px"}
            flex={"1 0 600px"}
            overflow={"hidden"}
            bgcolor={"rgb(0,0,0)"}
        >
            <Box sx={{ backgroundImage: `${data?.thumb_url}` }}></Box>
            <Stack
                zIndex={"999"}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                position={"absolute"}
                left={0}
                right={0}
                width={"100%"}
                height={"85px"}
            >
                <Box
                    position={"relative"}
                    width={"calc(100% - 184px)"}
                    maxWidth={"calc(-32px + 59.25vh)"}
                >
                    <Search />
                </Box>
            </Stack>
            <Box position={"relative"} width={"100%"} height={"100%"}>
                <video
                    autoPlay
                    loop
                    ref={videoRef}
                    poster={data?.thumb_url}
                    src={data?.file_url}
                    preload="auto"
                    style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
                <Box
                    position={"absolute"}
                    display={"flex"}
                    bottom={"10px"}
                    width={"70%"}
                    height={"24px"}
                    flex={"1 1 auto"}
                    left={"50%"}
                    sx={{ transform: "translateX(-50%)" }}
                >
                    <InputSlider
                        borderRadius="0"
                        height="100%"
                        widthThumb="12px"
                        heightThumb="12px"
                        heightX="4px"
                        widthX="100%"
                        min={MIN_VALUE}
                        max={MAX_VALUE}
                        step={STEP}
                        value={timeValueVideo}
                    />
                    <Typography component={"span"}></Typography>
                </Box>
            </Box>
            <ButtonIcon top={"20px"} left={"20px"}>
                <CloseIcon />
            </ButtonIcon>
            <ButtonIcon top={"20px"} right={"20px"}>
                <EllipsisHorizon />
            </ButtonIcon>
            <Stack
                direction={"column"}
                alignItems={"center"}
                position={"absolute"}
                top={"50%"}
                right={"20px"}
                sx={{ transform: "translateY(-50%)" }}
                gap={2}
            >
                <button
                    style={{
                        background: "rgba(84, 84, 84, 0.5)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "rotate(-90deg)",
                    }}
                >
                    <ArrowUp />
                </button>
                <button
                    style={{
                        background: "rgba(84, 84, 84, 0.5)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "rotate(90deg)",
                    }}
                >
                    <ArrowDown />
                </button>
            </Stack>
            <Stack
                direction={"column"}
                alignItems={"center"}
                position={"absolute"}
                bottom={"20px"}
                right={"20px"}
                gap={2}
            >
                <VolumeVideo isVertical direction="column-reverse" setTrack={setIsShowTrack} isShowTrack={isShowTrack}/>
            </Stack>
        </Box>
    );
}
