import { Box, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getVideoList } from "../../services/GetVideoList";
import HeaderVideo from "../../component/video/HeaderVideo";
import FooterVideo from "../../component/video/FooterVideo";
import VideoDetail from "../../component/video/VideoDetail";
import Video from "../../component/video/Video";
import { useInView } from "react-hook-inview";
let i=1;
export default function Home() {
    const [videoList, setVideoList] = useState([]);
    const videoRef = useRef([]);
    const [prevVolumes, setPrevVolumes] = useState({});
    const [audio, setAudio] = useState({});
    const [track, setTrack] = useState({});
    const [ref, isVisible] = useInView({threshold: 1});
    const [progress, setProgress] = useState({});    
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getVideoList(i);
            console.log(result);
            setVideoList(result.data);
        };
        if (isVisible) {
            let fetchApi1 = async () => {
                const result = await getVideoList(++i);
                console.log(result);
                setVideoList(prev => [...prev, ...result.data]);
            };
            fetchApi1();
        }
        fetchApi();
    }, [isVisible]);

    useEffect(() => {
        videoList?.forEach((item) => {
            const videoEle = videoRef.current[item.id];
            if (videoEle) {
                setPrevVolumes((prev) => ({
                    ...prev,
                    [item.id]: videoEle.volume,
                }));
                setTrack((prev) => ({
                    ...prev,
                    [item.id]: videoEle.volume,
                }));
                setAudio((prev) => ({
                    ...prev,
                    [item.id]: videoEle.volume,
                }));
            }
        });
    }, [videoList]);

    const handleVolumeChange = (id, e) => {
        const volume = e.target.value;
        const videoElement = videoRef.current[id];
        videoElement.volume = volume;

        setTrack((prev) => ({
            ...prev,
            [id]: volume,
        }));
        setAudio((prev) => ({
            ...prev,
            [id]: volume,
        }));
    };

    const toggleVolume = (id) => {
        const videoEle = videoRef.current[id];
        if (videoEle.volume === 0 && prevVolumes[id] !== undefined) {
            videoEle.volume = prevVolumes[id];
            setTrack((prev) => ({
                ...prev,
                [id]: prevVolumes[id],
            }));
            setAudio((prev) => ({
                ...prev,
                [id]: prevVolumes[id],
            }));
        } else {
            setPrevVolumes((prev) => ({
                ...prev,
                [id]: videoEle.volume,
            }));
            videoEle.volume = 0;
            setTrack((prev) => ({
                ...prev,
                [id]: 0,
            }));
            setAudio((prev) => ({
                ...prev,
                [id]: 0,
            }));
        }
    };
    const handleProgressChange = (e, videoList) => {
        const videoElement = videoRef.current[videoList.id];

        if (videoElement && videoElement.duration) {
            const duration = videoElement.duration;
            const newTime = (e.target.value / 100) * duration;
            videoElement.currentTime = newTime;
            setProgress((prev) => ({
                ...prev,
                [videoList.id]: e.target.value,
            }));
        }
    };
    const handleTimeUpdate = (videoId) => {
        const videoElement = videoRef.current[videoId];

        if (videoElement) {
            const currentTime = videoElement.currentTime;
            const duration = videoElement.duration;

            if (duration > 0) {
                setProgress((prev) => ({
                    ...prev,
                    [videoId]: (currentTime / duration) * 100,
                }));
            }
        }
    };
    
    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"} height={"100%"} maxHeight={"100vh"} pl={"240px"} sx={{scrollSnapType:"y mandatory",scrollbarWidth:"none",scrollBehavior:"smooth", overflowX:"scroll", '&::-webkit-scrollbar': {display: "none"}}}>
            {videoList?.map((video, index) => {
                const isLandscape =
                    video.meta.video.resolution_x >
                    video.meta.video.resolution_y;
                return (
                    <Stack
                        key={video.id}
                        direction={"row"}
                        alignItems={"start"}
                        justifyContent={"center"}
                        p={"70px 0 20px 0"}
                        m={"0 auto"}
                        width={isLandscape ? "100%" : "450px"}
                        maxWidth={isLandscape ? "600px" : "600px"}
                        height={isLandscape ? "50vh" : "calc(-20px + 100vh)"}
                        maxHeight={isLandscape ? "50vh" : "calc(100vh)"}
                        sx={{scrollSnapAlign:"start"}}
                    >
                        <Stack
                            direction={"row"}
                            alignItems={"flex-end"}
                            justifyContent={"center"}
                            m={"0 auto"}
                            width={"100%"}
                            height={"100%"}
                        >
                            <Box
                                width={"100%"}
                                height={"100%"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                mr={"12px"}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundSize: "cover",
                                        boxSizing: "border-box",
                                        borderRadius: "16px",
                                        position: "relative",
                                    }}
                                >
                                    <Box
                                        display={"flex"}
                                        alignItems={"flex-end"}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "16px",
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Video
                                            videoList={videoList}
                                            index={index}
                                            video={video}
                                            isLandscape={isLandscape}
                                            videoRef={videoRef}
                                            handleTimeUpdate={handleTimeUpdate}
                                        />
                                        <HeaderVideo
                                            audio={audio}
                                            video={video}
                                            track={track}
                                            toggleVolume={toggleVolume}
                                            handleVolumeChange={
                                                handleVolumeChange
                                            }
                                        />
                                        <FooterVideo
                                            video={video}
                                            progress={progress}
                                            handleProgressChange={
                                                handleProgressChange
                                            }
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Stack
                                direction={"column"}
                                justifyContent={"flex-end"}
                                alignItems={"center"}
                                height={"100%"}
                            >
                                <VideoDetail video={video} />
                            </Stack>
                        </Stack>
                    </Stack>
                );
            })}
            <Box ref={ref} display={"flex"} minHeight={"30px"} alignItems={"center"} justifyContent={"center"} sx={{scrollSnapAlign:"start"}}>
                loading...
            </Box>
        </Box>
    );
}
