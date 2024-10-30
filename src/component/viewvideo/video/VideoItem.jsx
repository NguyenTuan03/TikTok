/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { videoStyle } from "../../../const/VIIDEO_STYLE";
import { Box, Stack, Typography } from "@mui/material";
import { Videos } from "../../context/VideoContext";
import { CiMusicNote1 } from "react-icons/ci";
import InputSlider from "../../slider/InputSlider";
import HeaderVideo from "./HeaderVideo";
import { Auth } from "../../context/AuthContext";
export default function VideoItem({ video }) {
    const videoRef = useRef();
    const [playVideo, setPlayVideo] = useState(false);
    const [isShowTrack, setIsShowTrack] = useState(false);    
    const MIN_VALUE = 0;
    const MAX_VALUE = Number(video.meta.playtime_seconds);
    const { mute, setMute, valueVolume, setValueVolume, previousValue, setPreviousValue} = useContext(Videos);
    const STEP = 0.0001;
    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const {openFullVideo} = useContext(Auth);
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
    }, [videoRef, openFullVideo]);
    //handle play video
    const handlePlayVideo = () => {
        setPlayVideo((prev) => !prev);
        !playVideo ? videoRef.current.play() : videoRef.current.pause();
    };
    const handleMuteVideo = () => {
        setMute((prev) => !prev);
        if (mute) {
            setValueVolume(previousValue);
            videoRef.current.muted = false;
        }
        else {
            setPreviousValue(valueVolume)
            setValueVolume(MIN_VALUE);
            videoRef.current.muted = true;
        }
    };
    // Handle update progress bar
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
                videoRef.current.pause();
            }
        };
    }, [videoRef, openFullVideo]);
    const handleProgressChange = (e) => {
        const currentTime = Number(e);
        setTimeValueVideo(currentTime);
        videoRef.current.currentTime = currentTime;
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
            <HeaderVideo
                video={video}
                isShowTrack={isShowTrack}
                setIsShowTrack={setIsShowTrack}
                mute={mute}
                setMute={setMute}
                handleMuteVideo={handleMuteVideo}
                valueVolume={valueVolume}
                setValueVolume={setValueVolume}
                videoRef={videoRef}
            />
            {/* Footer */}
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
                        heightX="6px"
                        heightOver="8px"
                    />
                </Stack>
            </Stack>
        </>
    );
}
