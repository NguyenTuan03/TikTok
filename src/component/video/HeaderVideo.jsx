/* eslint-disable react/prop-types */
import { Box, Slider, Stack, Switch } from "@mui/material";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { CiFlag1 } from "react-icons/ci";
import { FaEllipsis, FaVolumeXmark } from "react-icons/fa6";
import { IoVolumeHighOutline } from "react-icons/io5";
import { LuHeartCrack } from "react-icons/lu";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
export default function HeaderVideo({audio,video,track, toggleVolume, handleVolumeChange}) {
    return (
        <Stack
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
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                width={"80px"}
            >
                {audio[video?.id] > 0.1 ? (
                    <>
                        <IoVolumeHighOutline
                            color="#fff"
                            fontSize={"34px"}
                            cursor={"pointer"}
                            onClick={() => toggleVolume(video.id)}
                        />
                    </>
                ) : (
                    <>
                        <FaVolumeXmark
                            color="#fff"
                            fontSize={"34px"}
                            cursor={"pointer"}
                            onClick={() => toggleVolume(video.id)}
                        />
                    </>
                )}
                <Slider
                    onChange={(e) => handleVolumeChange(video.id, e)}
                    aria-label="Volume"
                    min={0}
                    max={1}
                    step={0.01}
                    value={
                        track[video.id] !== undefined ? track[video.id] : 0.5
                    }
                    sx={{
                        color: "rgba(0,0,0,0.87)",
                        "& .MuiSlider-track": {
                            border: "none",
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
            </Stack>
            <Box>
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
                        <FaEllipsis color="#fff" fontSize={"20px"} />
                    </Box>
                </Tippy>
            </Box>
        </Stack>
    );
}
