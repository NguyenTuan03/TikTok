/* eslint-disable react/prop-types */

import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
    AudioPause,
    AudioPlayer,
    BackIcon,
    BellIcon,
    DisabledLove,
    EllipsisHorizon,
    HeartIcon,
    MusicPlayerIcon,
    PostIcon,
    RepostIcon2,
    SkeletonIcon,
    VolumeMute,
    VolumeUp,
} from "../icon/Icon";
import Image from "../image/Image";
import InputSlider from "../slider/InputSlider";
import UseVideoTime from "../../hooks/UseVideoTime";
import videoTime from "video-time";
const style = {
    color: "#fff",
    textAlign: "center",
    textShadow:
        "rgba(22, 24, 35, 0.2) 0px 0.718px 2.154px, rgba(0, 0, 0, 0.2) 0px 0.718px 0.718px",
    fontSize: "10px",
    fontWeight: 500,
};
export default function PhonePreviewVideo({
    user = {},
    stateFiles = [],    
    cropData,
    descript
}) {
    const videoRef = useRef();
    const MIN_VALUE = 0;
    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const currentTimeVideo = UseVideoTime(timeValueVideo);
    const [duration, setDuration] = useState(0);
    const [isFile] = stateFiles;    
    const [isActive, setIsActive] = useState({
        feed: true,
        profile: false,
    });
    const STEP = 0.001;
    const [isPlayed, setIsPlayed] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isOpacity, setIsOpacity] = useState(false);
    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (!video) return;

        const videoRuration = Math.floor(video.duration);
        setDuration(videoRuration);
    };
    const handleTogglePlay = () => {
        setIsPlayed((prev) => !prev);
        isPlayed ? videoRef.current.pause() : videoRef.current.play();
    };
    const handleToggleVolume = () => {
        setIsMuted((prev) => !prev);
        isMuted ? (videoRef.current.volume = 0) : (videoRef.current.volume = 1);
    };
    const handleChangeView = (e) => {
        if (e.target.innerText === "Feed") {
            setIsActive({
                profile: false,
                feed: true,
            });
        } else {
            setIsActive({
                feed: false,
                profile: true,
            });
        }
    };

    const handleProgressChange = (e) => {
        const currentTime = Number(e);
        videoRef.current.currentTime = currentTime;
        setTimeValueVideo(currentTime);
    };
    useEffect(() => {
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
            }
        };
    }, [videoRef]);
    return (
        <Stack justifyContent={"center"} alignItems={"center"}>
            <Stack
                direction={"row"}
                alignItems={"center"}
                borderRadius={"6px"}
                justifyContent={"center"}
                p={"3px"}
                bgcolor={"rgba(0, 0, 0, .05)"}
                mb={"16px"}
                height={"34px"}
            >
                <Typography
                    onClick={(e) => handleChangeView(e)}
                    height={"28px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    minWidth={"90px"}
                    fontSize={"14px"}
                    borderRadius={"4px"}
                    sx={{ cursor: "pointer" }}
                    bgcolor={isActive.feed === true ? "#fff" : "unset"}
                >
                    Feed
                </Typography>
                <Typography
                    onClick={(e) => handleChangeView(e)}
                    height={"28px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    minWidth={"90px"}
                    fontSize={"14px"}
                    borderRadius={"4px"}
                    sx={{ cursor: "pointer" }}
                    bgcolor={isActive.profile === true ? "#fff" : "unset"}
                >
                    Profile
                </Typography>
            </Stack>
            <Box
                width={"230px"}
                height={"480px"}
                bgcolor={isActive.feed ? "#000" : "#fff"}
                borderRadius={"34px"}
                position={"relative"}
                sx={{
                    border: "6px solid #202020",
                }}
            >
                <Box
                    position={"absolute"}
                    top={0}
                    left={"50%"}
                    width={"115px"}
                    height={"30px"}
                    bgcolor={"rgb(32, 32, 32)"}
                    borderRadius={"0 0 14px 14px"}
                    sx={{ transform: "translateX(-50%)" }}
                >
                    <Box
                        position={"absolute"}
                        width={"10px"}
                        height={"10px"}
                        borderRadius={"50%"}
                        top={"8px"}
                        left={"10px"}
                        bgcolor={"rgba(0, 0, 0, 0.15)"}
                    >
                        <Box
                            m={"3px"}
                            borderRadius={"50%"}
                            width={"4px"}
                            height={"4px"}
                            sx={{
                                background:
                                    "linear-gradient(325.01deg, rgb(156, 160, 197) -9.8%, rgba(156, 160, 197, 0) 63.24%)",
                            }}
                        ></Box>
                    </Box>
                </Box>
                {isActive.feed ? (
                    <Box
                        onMouseOver={() => setIsOpacity(true)}
                        onMouseOut={() => setIsOpacity(false)}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            position={"absolute"}
                            top={"48px"}
                            left={0}
                            right={0}
                            m={"0 17px"}
                            sx={{ opacity: "0.6" }}
                        >
                            <img
                                style={{ width: "14px", height: "14px" }}
                                src={
                                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI1NzFfMTI5MjMpIiBmaWx0ZXI9InVybCgjZmlsdGVyMF9kXzI1NzFfMTI5MjMpIj4KPHBhdGggZD0iTTguNTgyMTEgMS43MDI2MUwxMC42MjQzIDQuMDAwMTJINC41OTcxN0MzLjYxOTUgNC4wMDAxMiAyLjc4NTEyIDQuNzA2OTUgMi42MjQzOSA1LjY3MTMyTDIuMzYwNjkgNy4yNTM1MkMyLjMwOTg5IDcuNTU4MjkgMi41NDQ5MSA3LjgzNTcyIDIuODUzODggNy44MzU3MkgzLjg2NzY4QzQuMTEyMSA3LjgzNTcyIDQuMzIwNjkgNy42NTkwMiA0LjM2MDg3IDcuNDE3OTJMNC41NjIzNiA2LjIwOTAyQzQuNTgyNDUgNi4wODg0OCA0LjY4Njc1IDYuMDAwMTIgNC44MDg5NiA2LjAwMDEySDIxLjE5MTFDMjEuMzEzMyA2LjAwMDEyIDIxLjQxNzYgNi4wODg0OCAyMS40Mzc3IDYuMjA5MDJMMjEuNjM5MiA3LjQxNzkyQzIxLjY3OTQgNy42NTkwMiAyMS44ODggNy44MzU3MiAyMi4xMzI0IDcuODM1NzJIMjMuMTQ2MkMyMy40NTUyIDcuODM1NzIgMjMuNjkwMiA3LjU1ODI5IDIzLjYzOTQgNy4yNTM1MkwyMy4zNzU3IDUuNjcxMzJDMjMuMjE1IDQuNzA2OTUgMjIuMzgwNiA0LjAwMDEyIDIxLjQwMjkgNC4wMDAxMkgxNS4zNzAzTDE3LjQxMjYgMS43MDI2MUMxNy41OTYgMS40OTYyMSAxNy41Nzc0IDEuMTgwMTggMTcuMzcxIDAuOTk2NzE5TDE2LjYyMzYgMC4zMzIzNTZDMTYuNDE3MiAwLjE0ODg5NiAxNi4xMDEyIDAuMTY3NDg3IDE1LjkxNzcgMC4zNzM4NzhMMTIuOTk3MyAzLjY1OTM0TDEwLjA3NjkgMC4zNzM4NzhDOS44OTM0NyAwLjE2NzQ4NyA5LjU3NzQzIDAuMTQ4ODk2IDkuMzcxMDQgMC4zMzIzNTVMOC42MjM2MyAwLjk5NjcxOUM4LjQxNzI0IDEuMTgwMTggOC4zOTg2NSAxLjQ5NjIxIDguNTgyMTEgMS43MDI2MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMC40NTA1IDkuODUwMTJDMjAuMTc0NCA5Ljg1MDEyIDE5Ljk1MDUgMTAuMDc0IDE5Ljk1MDUgMTAuMzUwMVYxNy4zNTAxQzE5Ljk1MDUgMTcuNjI2MyAyMC4xNzQ0IDE3Ljg1MDEgMjAuNDUwNSAxNy44NTAxSDI0LjE1QzI0LjQyNjEgMTcuODUwMSAyNC42NSAxNy42MjYzIDI0LjY1IDE3LjM1MDFWMTYuMzUwMUMyNC42NSAxNi4wNzQgMjQuNDI2MSAxNS44NTAxIDI0LjE1IDE1Ljg1MDFIMjEuOTcyNVYxNC44NTAxSDI0LjE1QzI0LjQyNjEgMTQuODUwMSAyNC42NSAxNC42MjYzIDI0LjY1IDE0LjM1MDFWMTMuMzUwMUMyNC42NSAxMy4wNzQgMjQuNDI2MSAxMi44NTAxIDI0LjE1IDEyLjg1MDFIMjEuOTcyNVYxMS44NTAxSDI0LjE1QzI0LjQyNjEgMTEuODUwMSAyNC42NSAxMS42MjYzIDI0LjY1IDExLjM1MDFWMTAuMzUwMUMyNC42NSAxMC4wNzQgMjQuNDI2MSA5Ljg1MDEyIDI0LjE1IDkuODUwMTJIMjAuNDUwNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yIDkuODUwMTJDMS43MjM4NiA5Ljg1MDEyIDEuNSAxMC4wNzQgMS41IDEwLjM1MDFWMTcuMzUwMUMxLjUgMTcuNjI2MyAxLjcyMzg2IDE3Ljg1MDEgMiAxNy44NTAxSDUuODAyMkM2LjA3ODM0IDE3Ljg1MDEgNi4zMDIyIDE3LjYyNjMgNi4zMDIyIDE3LjM1MDFWMTYuMzUwMUM2LjMwMjIgMTYuMDc0IDYuMDc4MzQgMTUuODUwMSA1LjgwMjIgMTUuODUwMUgzLjUyMTk4VjEwLjM1MDFDMy41MjE5OCAxMC4wNzQgMy4yOTgxMiA5Ljg1MDEyIDMuMDIxOTggOS44NTAxMkgyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTcuNTY1OTMgMTcuMzUwMUM3LjU2NTkzIDE3LjYyNjMgNy43ODk3OSAxNy44NTAxIDguMDY1OTMgMTcuODUwMUg5LjA4NzkxQzkuMzY0MDUgMTcuODUwMSA5LjU4NzkxIDE3LjYyNjMgOS41ODc5MSAxNy4zNTAxVjEwLjM1MDFDOS41ODc5MSAxMC4wNzQgOS4zNjQwNSA5Ljg1MDEyIDkuMDg3OTEgOS44NTAxMkg4LjA2NTkzQzcuNzg5NzkgOS44NTAxMiA3LjU2NTkzIDEwLjA3NCA3LjU2NTkzIDEwLjM1MDFWMTcuMzUwMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNC45ODY3IDE1Ljg2MjZIMTQuNzQwMkwxMy4wOTkzIDEwLjIxMDdDMTMuMDM3MyA5Ljk5NzA5IDEyLjg0MTYgOS44NTAxMiAxMi42MTkyIDkuODUwMTJIMTEuNTkwOEMxMS4yNTc3IDkuODUwMTIgMTEuMDE3OCAxMC4xNjk3IDExLjExMDYgMTAuNDg5NUwxMy4xNDI5IDE3LjQ4OTVDMTMuMjA0OSAxNy43MDMyIDEzLjQwMDYgMTcuODUwMSAxMy42MjMxIDE3Ljg1MDFIMTYuMTAzOEMxNi4zMjYzIDE3Ljg1MDEgMTYuNTIyIDE3LjcwMzIgMTYuNTg0IDE3LjQ4OTVMMTguNjE2MiAxMC40ODk1QzE4LjcwOTEgMTAuMTY5NyAxOC40NjkxIDkuODUwMTIgMTguMTM2MSA5Ljg1MDEySDE3LjEwNzdDMTYuODg1MyA5Ljg1MDEyIDE2LjY4OTYgOS45OTcwOSAxNi42Mjc2IDEwLjIxMDdMMTQuOTg2NyAxNS44NjI2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIzLjM3NTkgMjEuOTE0NUMyMy4yMTUxIDIyLjg3ODkgMjIuMzgwNyAyMy41ODU3IDIxLjQwMzEgMjMuNTg1N0w0LjU5NzMzIDIzLjU4NTdDMy42MTk2NSAyMy41ODU3IDIuNzg1MjcgMjIuODc4OSAyLjYyNDU0IDIxLjkxNDVMMi4zNjA4NCAyMC4zMzIzQzIuMzEwMDQgMjAuMDI3NiAyLjU0NTA3IDE5Ljc1MDEgMi44NTQwNCAxOS43NTAxSDMuODY3ODNDNC4xMTIyNSAxOS43NTAxIDQuMzIwODQgMTkuOTI2OCA0LjM2MTAzIDIwLjE2NzlMNC41NjI1MSAyMS4zNzY4QzQuNTgyNiAyMS40OTc0IDQuNjg2OSAyMS41ODU3IDQuODA5MTEgMjEuNTg1N0wyMS4xOTEzIDIxLjU4NTdDMjEuMzEzNSAyMS41ODU3IDIxLjQxNzggMjEuNDk3NCAyMS40Mzc5IDIxLjM3NjhMMjEuNjM5NCAyMC4xNjc5QzIxLjY3OTYgMTkuOTI2OCAyMS44ODgxIDE5Ljc1MDEgMjIuMTMyNiAxOS43NTAxSDIzLjE0NjRDMjMuNDU1MyAxOS43NTAxIDIzLjY5MDQgMjAuMDI3NiAyMy42Mzk2IDIwLjMzMjNMMjMuMzc1OSAyMS45MTQ1WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kXzI1NzFfMTI5MjMiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xMiAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzI1NzFfMTI5MjMiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMjU3MV8xMjkyMyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPGNsaXBQYXRoIGlkPSJjbGlwMF8yNTcxXzEyOTIzIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
                                }
                            />
                            <Stack
                                flex={"1 1 0%"}
                                direction={"row"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                fontSize={"12px"}
                                fontWeight={500}
                                gap={"11px"}
                            >
                                <Typography color={"rgba(255, 255, 255, 0.6)"}>
                                    Following
                                </Typography>
                                <Typography color={"rgba(255, 255, 255, 0.6)"}>
                                    For you
                                </Typography>
                            </Stack>
                            <img
                                style={{ width: "14px", height: "14px" }}
                                src={
                                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNSAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8yNTcxXzEyOTI3KSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAuNjMxNiAzLjVDNi40MTY3NyAzLjUgMyA2LjkxNjc3IDMgMTEuMTMxNkMzIDE1LjM0NjQgNi40MTY3NyAxOC43NjMyIDEwLjYzMTYgMTguNzYzMkMxNC44NDY0IDE4Ljc2MzIgMTguMjYzMiAxNS4zNDY0IDE4LjI2MzIgMTEuMTMxNkMxOC4yNjMyIDYuOTE2NzcgMTQuODQ2NCAzLjUgMTAuNjMxNiAzLjVaTTEgMTEuMTMxNkMxIDUuODEyMiA1LjMxMjIgMS41IDEwLjYzMTYgMS41QzE1Ljk1MSAxLjUgMjAuMjYzMiA1LjgxMjIgMjAuMjYzMiAxMS4xMzE2QzIwLjI2MzIgMTMuNDMxMSAxOS40NTczIDE1LjU0MjQgMTguMTEyNyAxNy4xOTg0TDIyLjk0MTkgMjIuMDI3N0MyMy4wODg0IDIyLjE3NDIgMjMuMDg4NCAyMi40MTE2IDIyLjk0MTkgMjIuNTU4MUwyMi4wNTgxIDIzLjQ0MTlDMjEuOTExNiAyMy41ODg0IDIxLjY3NDIgMjMuNTg4NCAyMS41Mjc3IDIzLjQ0MTlMMTYuNjk4NCAxOC42MTI3QzE1LjA0MjQgMTkuOTU3MyAxMi45MzExIDIwLjc2MzIgMTAuNjMxNiAyMC43NjMyQzUuMzEyMiAyMC43NjMyIDEgMTYuNDUxIDEgMTEuMTMxNloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8yNTcxXzEyOTI3IiB4PSItMSIgeT0iMCIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMC41Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEyIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMjU3MV8xMjkyNyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18yNTcxXzEyOTI3IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo="
                                }
                            />
                        </Stack>
                        <video
                            style={{
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                objectFit: "cover",
                                width: "100%",
                            }}
                            src={isFile}
                            ref={videoRef}
                            onLoadedMetadata={handleLoadedMetadata}
                            loop
                            onClick={handleTogglePlay}
                        />
                        <img
                            style={{
                                backgroundSize: "cover",
                                width: "100%",
                                height: "30px",
                                position: "absolute",
                                bottom: "22px",
                            }}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0gAAABqCAMAAACxtYFJAAACClBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8g1ez7LGz/////////////MHD///////////////8g1+v///////////8g1+8g1uz/MHD////6LWz6LW3////////5LGz6MG0g1+wg1Owg1O0g1e36LWwg0uz6Lmwg1e8g1u0g1esg1Or4Lmv4LWsg0+sg0+sgz+/6LW36Lmz6Lmz6MGr6LGz9scf7MGyA6Pb5Lmwg1+36LW0g1+cg1uwg2uog1ezH9fvj+/v6iasg1e38MGz///8g1Ov5LWxF3O/4K2sg1Oz95esg1O0g1Oz6Lm0g1eog1Oog1exF3O+I6PWw8Pjf+P3v/f7+0eD9tMr9j7D7P3j5LWz6LW38LWz/KHC58vkWGCNRUlozNT8lJjGZmp+2trvj+v22t7qr7/g82u7x/f77YpE82u/6O3Wr7/f8iaxtbnZ8fYOQ6va2t7tl4vLw8fF05fPx/P39o75l4/L7VYj7fKOC6PT/2OTT09b8fKPi4uPx8fH/8vYu2O37OnWP6vX+vdH+y9rV9/v9y9r7b5r///8u1+39o7/j+f37R36C5/T+5e2d7fb6LWzH9frFxcinqK39lrX/5e0g1ez9sMhY3/FVJX3KAAAAcXRSTlMAvwczj2AYpzB4SN8Md7OAIEBUPCSbbINrEO9gQF+gUCCfz3B/QFOQryC/EIS/37BvgGBg7+/f71DvMN+AoHCwQIAQYJDPMJCAQHCAf48gUDCfgIBwz1BHcFBgcKCAcJDfMJCvv8/f39/f38+/r59QINU6/rYAAAyoSURBVHhe7MAxDQAADAIwsvn3jAjeNj8DcjOg7MCxDYAgEADAbz4h6AIUFhoKl2ZXjSvYoLmLDwIAAAAAAAAAAACAbTkyXgH6uPWYEaylZtYSs2v7eJwt/oyLvTv9b9woAzj+zOejOayMFFuyZcc0zSbb3ZBml9I9WGjLVWjLfd/3v8AulHMLlKPcBdoCLUyhFG+26/I/4vixFVuKZTlRpCfxfF8l2X0l+ecZaXS4bScPF0hRHZ8N+Z4AyuorZmSlDhQpTzLGWl4TjsPq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"
                        />
                        <Stack
                            position={"absolute"}
                            bottom={"52px"}
                            right={"4px"}
                            padding={"0 5px 36px"}
                            gap={"14px"}
                            alignItems={"center"}
                        >
                            <Box position={"relative"}>
                                <Image
                                    border={"0.5px solid rgb(255, 255, 255)"}
                                    width={"25px"}
                                    height={"25px"}
                                    borderRadius
                                    src={user.data.avatar}
                                />
                                <img
                                    style={{
                                        width: "11px",
                                        height: "11px",
                                        position: "absolute",
                                        bottom: "-5px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                    }}
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICAgIDxyZWN0IHg9IjAuNzE3OTU3IiB5PSIwLjc5NDkyMiIgd2lkdGg9IjE0LjM1OSIgaGVpZ2h0PSIxNC4zNTkiIHJ4PSI3LjE3OTQ5IiBmaWxsPSIjRkUyQzU1IiAvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgZD0iTTcuODk3NDIgNC4zODQ3N0M3LjUwMDkxIDQuMzg0NzcgNy4xNzk0NyA0LjcwNjIgNy4xNzk0NyA1LjEwMjcxVjcuMjU2NTZINS4wMjU2M0M0LjYyOTExIDcuMjU2NTYgNC4zMDc2OCA3LjU3OCA0LjMwNzY4IDcuOTc0NTFDNC4zMDc2OCA4LjM3MTAyIDQuNjI5MTEgOC42OTI0NiA1LjAyNTYzIDguNjkyNDZINy4xNzk0N1YxMC44NDYzQzcuMTc5NDcgMTEuMjQyOCA3LjUwMDkxIDExLjU2NDMgNy44OTc0MiAxMS41NjQzQzguMjkzOTMgMTEuNTY0MyA4LjYxNTM3IDExLjI0MjggOC42MTUzNyAxMC44NDYzVjguNjkyNDZIMTAuNzY5MkMxMS4xNjU3IDguNjkyNDYgMTEuNDg3MiA4LjM3MTAyIDExLjQ4NzIgNy45NzQ1MUMxMS40ODcyIDcuNTc4IDExLjE2NTcgNy4yNTY1NiAxMC43NjkyIDcuMjU2NTZIOC42MTUzN1Y1LjEwMjcxQzguNjE1MzcgNC43MDYyIDguMjkzOTMgNC4zODQ3NyA3Ljg5NzQyIDQuMzg0NzdaIgogICAgICAgIGZpbGw9IndoaXRlIiAvPgo8L3N2Zz4="
                                />
                            </Box>
                            <Stack gap={"12px"}>
                                <Box>
                                    <HeartIcon color="#fff" />
                                    <Typography sx={style}>1000</Typography>
                                </Box>
                                <Box>
                                    <HeartIcon color="#fff" />
                                    <Typography sx={style}>1000</Typography>
                                </Box>
                                <Box>
                                    <HeartIcon color="#fff" />
                                    <Typography sx={style}>1000</Typography>
                                </Box>
                                <Box>
                                    <HeartIcon color="#fff" />
                                    <Typography sx={style}>1000</Typography>
                                </Box>
                            </Stack>
                            <Box
                                width={"29px"}
                                height={"29px"}
                                borderRadius={"50%"}
                                position={"relative"}
                                sx={{
                                    background:
                                        "conic-gradient(from 90deg at 50% 50%, rgb(57, 57, 57) -40.11deg, rgb(21, 21, 21) 47.27deg, rgb(57, 57, 57) 143.02deg, rgb(22, 22, 22) 227.49deg, rgb(57, 57, 57) 319.89deg, rgb(21, 21, 21) 407.27deg)",
                                }}
                            >
                                <Box
                                    width={"6px"}
                                    height={"6px"}
                                    borderRadius={"50%"}
                                    position={"absolute"}
                                    top={"50%"}
                                    left={"50%"}
                                    sx={{
                                        transform: "translate(-50%, -50%)",
                                        background:
                                            "linear-gradient(rgb(26, 26, 26) 0%, rgb(33, 33, 33) 100%)",
                                    }}
                                ></Box>
                            </Box>
                        </Stack>
                        <Stack
                            position={"absolute"}
                            bottom={"52px"}
                            left={"4px"}
                            padding={"0 5px 36px"}
                            gap={"14px"}
                            p={"0 4px 10px 4px"}
                            color={"#fff"}
                        >
                            <Typography>
                                {user.data.last_name +
                                    " " +
                                    user.data.first_name || user.data.nickname}
                            </Typography>
                            <Typography>{descript}</Typography>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap={"6px"}
                            >
                                <MusicPlayerIcon />
                                <Typography>Original sound - </Typography>
                                {user.data.last_name +
                                    " " +
                                    user.data.first_name || user.data.nickname}
                            </Stack>
                        </Stack>
                        <Stack
                            position={"absolute"}
                            left={"0px"}
                            right={"0px"}
                            bottom={"25px"}
                            height={"30px"}
                            padding={"0 16px"}
                            justifyContent={"center"}
                            gap={"4px"}
                            color={"#fff"}
                            sx={{
                                opacity: isOpacity ? 1 : 0,
                                transition: "opacity 500ms",
                                backgroundColor:
                                    "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
                            }}
                        >
                            <Box
                                position={"absolute"}
                                left={0}
                                bottom={0}
                                width={"100%"}
                                height={"205px"}
                                overflow={"hidden"}
                                zIndex={1}
                                sx={{
                                    background:
                                        "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
                                }}
                            ></Box>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                width={"100%"}
                                zIndex={2}
                            >
                                <InputSlider
                                    value={timeValueVideo}
                                    min={MIN_VALUE}
                                    max={duration}
                                    step={STEP}
                                    onChange={handleProgressChange}
                                    height="2px"
                                    heightX="2px"
                                    heightOver="2px"
                                    heightThumb="0"
                                    bgProgress="#fff"
                                />
                            </Stack>
                            <Stack
                                direction={"row"}
                                display={"flex"}
                                height={"20px"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                zIndex={2}
                            >
                                <Stack direction={"row"} gap={"5px"}>
                                    {isPlayed ? (
                                        <AudioPlayer
                                            width="16px"
                                            height="16px"
                                            onClick={handleTogglePlay}
                                        />
                                    ) : (
                                        <AudioPause
                                            width="16px"
                                            height="16px"
                                            onClick={handleTogglePlay}
                                        />
                                    )}
                                    <Typography
                                        component={"span"}
                                        color={"#fff"}
                                    >
                                        {currentTimeVideo.minutes}:
                                        {currentTimeVideo.seconds} /{" "}
                                        {videoTime(duration)}
                                    </Typography>
                                </Stack>
                                <Stack direction={"row"}>
                                    {!isMuted ? (
                                        <VolumeMute
                                            width="16px"
                                            height="16px"
                                            onClick={handleToggleVolume}
                                        />
                                    ) : (
                                        <VolumeUp
                                            width="16px"
                                            height="16px"
                                            onClick={handleToggleVolume}
                                        />
                                    )}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                ) : (
                    <Box>
                        <Stack
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                        >
                            <Stack
                                width={"100%"}
                                p={"0 10px"}
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                mt={"35px"}
                                height={"30px"}
                                gap={"10px"}
                            >
                                <BackIcon />
                                <Stack direction={"row"} gap={"6px"}>
                                    <BellIcon />
                                    <EllipsisHorizon
                                        width="17px"
                                        height="16px"
                                        color="#000"
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack
                            width={"100%"}
                            direction={"row"}
                            justifyContent={"center"}
                        >
                            <Image
                                border={"0.5px solid rgb(255, 255, 255)"}
                                width={"50px"}
                                height={"50px"}
                                borderRadius
                                src={user.data.avatar}
                            />
                        </Stack>
                        <Typography textAlign={"center"} fontWeight={"bold"}>
                            {user.data.last_name + " " + user.data.first_name ||
                                user.data.nickname}
                        </Typography>
                        <Box width={"100%"} textAlign={"center"}>
                            <SkeletonIcon />
                        </Box>
                        <Stack
                            direction={"row"}
                            height={"28px"}
                            justifyContent={"space-around"}
                            alignItems={"center"}
                        >
                            <Box borderBottom={"2px solid rgb(22, 24, 35)"}>
                                <PostIcon />
                            </Box>
                            <RepostIcon2 />
                            <DisabledLove />
                        </Stack>
                        <Grid spacing={0.3} height={"100%"} container>
                            <Grid item xs={4}>
                                <Image
                                    src={cropData}
                                    width={"100%"}
                                    height={"80px"}
                                />
                            </Grid>
                            {Array.from({ length: 8 }, (_, index) => (
                                <Grid item xs={4} key={index}>
                                    <Skeleton
                                        variant="rectangular"
                                        width="100%"
                                        height="80px"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
        </Stack>
    );
}
