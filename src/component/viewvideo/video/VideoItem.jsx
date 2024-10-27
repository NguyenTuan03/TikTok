/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { videoStyle } from "../../../const/VIIDEO_STYLE";
import { Box, Slider, Stack, Switch } from "@mui/material";
import { Videos } from "../../context/VideoContext";
import { EllipsisHorizon, VolumeMute, VolumeUp } from "../../icon/Icon";
import Tippy from "@tippyjs/react";
import { HEADER_SLIDER } from "../../../const/HEADER_SLIDER";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { LuHeartCrack } from "react-icons/lu";
import { CiFlag1 } from "react-icons/ci";

export default function VideoItem({ video }) {
    const videoRef = useRef();
    const [playVideo, setPlayVideo] = useState(false);
    const { isShowVolume } = useContext(Videos);
    const [isShowTrack, setIsShowTrack] = useState(false);
    
    //Handle played Videos in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.play();
                        entry.target.currentTime = 0;
                    } else {
                        entry.target.pause();
                    }
                });
            },
            { threshold: 0.7 }
        );
        const currentVideoElement = videoRef.current;
        if (currentVideoElement) {
            observer.observe(currentVideoElement);
        }
        return () => {
            if (currentVideoElement) {
                observer.unobserve(currentVideoElement);
            }
        };
    }, [videoRef]);
    //handle play video
    const handlePlayVideo = () => {
        setPlayVideo((prev) => !prev);
        !playVideo ? videoRef.current.play() : videoRef.current.pause();
    };

    return (
        <>
            <video
                onClick={() => handlePlayVideo()}
                autoPlay={true}
                loop
                // muted
                poster={video.thumb_url}
                style={videoStyle}
                ref={videoRef}
                preload="auto"
            >
                <source src={video.file_url} />
            </video>
            {/* Header video */}
            <Stack
                className="header_video"
                display={"none"}
                width={"100%"}
                spacing={1}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                position={"absolute"}
                top={"5px"}
                padding={"0 10px"}
            >
                <Stack
                    display={isShowVolume ? "flex" : "none"}
                    direction={"row"}
                    alignItems={"center"}
                    spacing={2}
                    onMouseEnter={() => setIsShowTrack(true)}
                    onMouseLeave={() => setIsShowTrack(false)}
                >
                    {video.id > 0.1 ? (
                        <>
                            <VolumeUp
                                width="24px"
                                height="24px"
                                cursor={"pointer"}
                            />
                        </>
                    ) : (
                        <>
                            <VolumeMute
                                cursor={"pointer"}
                            />
                        </>
                    )}

                    <Box
                        width={"64px"}
                        height={"24px"}
                        bgcolor={"#16182357"}
                        textAlign={"center"}
                        borderRadius={"24px"}
                        position={"relative"}
                        marginLeft={"6px !important"}
                        display={isShowTrack ? "block" : "none"}
                    >
                        <Slider
                            aria-label="Volume"
                            min={0}
                            max={1}
                            step={0.01}
                            sx={HEADER_SLIDER}
                        />
                    </Box>
                </Stack>
                <Box display={isShowVolume ? "block" : "none"}>
                    <Tippy
                        placement="right-end"
                        interactive
                        // visible
                        offset={[0, 10]}
                        render={(attrs) => (
                            <Box className="box" tabIndex="-1" {...attrs}>
                                <Stack
                                    bgcolor={"#fff"}
                                    boxShadow={
                                        "rgba(0, 0, 0, 0.12) 0px 2px 12px"
                                    }
                                    p={"4px 0"}
                                    borderRadius={"8px"}
                                >
                                    <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        justifyContent={"flex-start"}
                                        p={"8px 24px 8px 14px"}
                                        gap={1}
                                        sx={{
                                            cursor: "pointer",
                                            ":hover": {
                                                backgroundColor: "#e7e7e7",
                                            },
                                        }}
                                    >
                                        <MdKeyboardDoubleArrowUp
                                            fontSize={"16px"}
                                        />
                                        <span>Auto scroll</span>
                                        <Switch
                                            sx={{
                                                "& .MuiSwitch-thumb": {
                                                    width: "34px",
                                                    height: "10px",
                                                    transform:
                                                        "translate(-20px,-2.7px)",
                                                },
                                                "& .MuiSwitch-input": {
                                                    left: "-5%",
                                                    top: "-2px",
                                                },
                                            }}
                                        />
                                    </Stack>
                                    <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        justifyContent={"flex-start"}
                                        p={"8px 24px 8px 14px"}
                                        gap={1}
                                        sx={{
                                            cursor: "pointer",
                                            ":hover": {
                                                backgroundColor: "#e7e7e7",
                                            },
                                        }}
                                    >
                                        <LuHeartCrack fontSize={"16px"} />
                                        <span>Not interested</span>
                                    </Stack>
                                    <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        justifyContent={"flex-start"}
                                        p={"8px 24px 8px 14px"}
                                        gap={1}
                                        sx={{
                                            cursor: "pointer",
                                            ":hover": {
                                                backgroundColor: "#e7e7e7",
                                            },
                                        }}
                                    >
                                        <CiFlag1 fontSize={"16px"} />
                                        <span>Report</span>
                                    </Stack>
                                </Stack>
                            </Box>
                        )}
                    >
                        <Box>
                            <EllipsisHorizon />
                        </Box>
                    </Tippy>
                </Box>
            </Stack>
            <FooterVideo video={video} />
        </>
    );
}
