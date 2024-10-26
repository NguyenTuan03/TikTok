/* eslint-disable react/prop-types */
import { Box, Slider, Stack, Switch } from "@mui/material";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { CiFlag1 } from "react-icons/ci";
import { LuHeartCrack } from "react-icons/lu";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { EllipsisHorizon, VolumeMute, VolumeUp } from "../icon/Icon";
import { useContext, useState } from "react";
import { Videos } from "../context/VideoContext";
export default function HeaderVideo({ video }) {
    const { isShowVolume } = useContext(Videos);
    const [isShowTrack, setIsShowTrack] = useState(false);
    return (
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
                            // onClick={() => toggleVolume(video.id)}
                        />
                    </>
                ) : (
                    <>
                        <VolumeMute
                            cursor={"pointer"}
                            // onClick={() => toggleVolume(video.id)}
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
                        // onChange={(e) => handleVolumeChange(video.id, e)}
                        aria-label="Volume"
                        min={0}
                        max={1}
                        step={0.01}
                        // value={
                        //     track[video.id] !== undefined ? track[video.id] : 0.5
                        // }
                        sx={{
                            position: "absolute",
                            left: "13px",
                            top: "-3px",
                            width: "38px",
                            color: "rgba(0,0,0,0.87)",
                            "& .MuiSlider-rail": {
                                backgroundColor: "#fff",
                            },
                            "& .MuiSlider-track": {
                                border: "none",
                                backgroundColor: "#fff",
                            },
                            "& .MuiSlider-thumb": {
                                width: 12,
                                height: 12,
                                backgroundColor: "#fff",
                                "&::before": {
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                                },
                                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                                    boxShadow: "none",
                                },
                            },
                        }}
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
                                boxShadow={"rgba(0, 0, 0, 0.12) 0px 2px 12px"}
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
    );
}
