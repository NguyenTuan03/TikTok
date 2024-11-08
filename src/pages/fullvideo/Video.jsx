/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import Search from "../../component/search/Search";
import {  useContext, useEffect, useRef, useState } from "react";
import InputSlider from "../../component/slider/InputSlider";
import {
    ArrowDown,
    ArrowUp,
    CloseIcon,
    EllipsisHorizon,    
} from "../../component/icon/Icon";
import ButtonIcon from "../../component/icon/ButtonIcon";
import VolumeVideo from "../../component/volume/VolumeVideo";
import { useNavigate } from "react-router-dom";
import Menu from "../../component/popper/menu/Menu";
import { HEADER_VIDEO } from "../../const/HEADER_VIDEO";
import { Videos } from "../../component/context/VideoContext";
import videoTime from "video-time";
import UseVideoTime from "../../hooks/UseVideoTime";

export default function Video({
    onPrevPage = () => {},
    onNextPage = () => {},
    data,
    position,
    listVideo,    
}) {
    const MIN_VALUE = 0;
    const MAX_VALUE = Number(data?.meta?.playtime_seconds);
    const STEP = 0.001;
    const videoRef = useRef();
    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const [isShowTrack, setIsShowTrack] = useState(false);
    const { mute, setMute, valueVolume, setValueVolume, previousValue, setPreviousValue} = useContext(Videos)
    const duration =  videoTime(MAX_VALUE);  
    const currentTimeVideo = UseVideoTime(timeValueVideo)    
    
    const nav = useNavigate();
    const handleExit = () => {
        nav(-1);
    };
    const handleChangeTime = (e) => {
        const currentTime = e;
        setTimeValueVideo(currentTime);        
        videoRef.current.currentTime = currentTime;
    }
    useEffect(() => {
        const handleTimeUpdate = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;
                setTimeValueVideo(currentTime);
            }
        }
        if (videoRef.current) {
            videoRef.current.addEventListener("timeupdate", handleTimeUpdate)
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener("timeupdate", handleTimeUpdate)
            }
        }
    },[position]);
    const handleChangeValueVolume = (e) => {
        const sliderValue = Number(e.target.value);
        setValueVolume(sliderValue);
        videoRef.current.volume = sliderValue;
        if (sliderValue === 0) {
            setMute(true);
        } else {
            setMute(false);
        }
    };
    const handleMuteVideo = () => {
        setMute((prevMute) => {
            if (!prevMute) {
                setPreviousValue(valueVolume);
                setValueVolume(MIN_VALUE); 
                videoRef.current.muted = true;
            } else {
                setValueVolume(previousValue);
                videoRef.current.muted = false;
            }
            return !prevMute;
        });
    };
    const handlePlayVideo = (e) => {
        const videoEle = e.target
        videoEle.paused ? videoEle.play() : videoEle.pause();
    };
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
                    // width={"calc(100% - 184px)"}
                    maxWidth={"calc(-32px + 59.25vh)"}
                >
                    <Search transparent={true} />
                </Box>
            </Stack>
            <Box position={"relative"} width={"100%"} height={"100%"}>
                <video
                    onClick={e => handlePlayVideo(e)}
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
                    alignItems={"center"}
                    gap={2}
                    bottom={"10px"}
                    width={"45%"}
                    height={"24px"}
                    flex={"1 1 auto"}
                    left={"50%"}
                    sx={{ transform: "translateX(-50%)" }}
                >
                    <InputSlider
                        flex={"1 1 auto"}
                        borderRadius="0"
                        width="100%"
                        height="100%"
                        widthThumb="12px"
                        heightThumb="12px"
                        heightX="4px"
                        widthX="100%"
                        min={MIN_VALUE}
                        max={MAX_VALUE}
                        step={STEP}
                        value={timeValueVideo}
                        onChange={handleChangeTime}
                        
                    />
                    <Typography component={"span"} color={"#fff"}>
                        {currentTimeVideo.minutes}:{currentTimeVideo.seconds}/
                        {duration}
                    </Typography>
                </Box>
            </Box>
            <ButtonIcon top={"20px"} left={"20px"} onClick={handleExit}>
                <CloseIcon />
            </ButtonIcon>

            <Menu
                items={HEADER_VIDEO}
                width={"200px"}
                height={"150px"}
                placement="bottom-end"
            >
                <ButtonIcon top={"20px"} right={"20px"}>
                    <EllipsisHorizon />
                </ButtonIcon>
            </Menu>

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
                    onClick={onPrevPage}
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
                    onClick={onNextPage}
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
                <VolumeVideo
                    onClick={handleMuteVideo}
                    valueVolume={valueVolume}
                    mute={mute}
                    isVertical
                    direction="column-reverse"
                    setTrack={setIsShowTrack}
                    isShowTrack={isShowTrack}
                    onChange={handleChangeValueVolume}
                />
            </Stack>
        </Box>
    );
}
