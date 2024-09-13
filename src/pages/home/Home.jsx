import { Box, Slider, Stack, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useEffect, useRef, useState } from "react";
import { getVideoList } from "../../services/GetVideoList";
import { FaHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { FaVolumeXmark } from "react-icons/fa6";
import { IoVolumeHighOutline } from "react-icons/io5";
import { FaEllipsis } from "react-icons/fa6";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { LuHeartCrack } from "react-icons/lu";
import { CiFlag1 } from "react-icons/ci";
import { CiMusicNote1 } from "react-icons/ci";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
export default function Home() {
    const [video, setVideo] = useState([]);
    const videoRef = useRef([]);
    const [prevVolumes, setPrevVolumes] = useState({});
    const [audio, setAudio] = useState({});
    const [track, setTrack] = useState({});
    
    const [progress, setProgress] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getVideoList(1);
            console.log(result);
            setVideo(result.data);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        video?.forEach((item) => {
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
    }, [video]);

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
    const handleProgressChange = (e,video) => {
        const videoElement = videoRef.current[video.id];

        if (videoElement && videoElement.duration) {
            const duration = videoElement.duration;
            const newTime = (e.target.value / 100) * duration;
            videoElement.currentTime = newTime;
            setProgress(prev => ({
                ...prev,
                [video.id]: e.target.value // Update only this video's progress
            }));
        }
    };
    const handleTimeUpdate = (videoId) => {
        const videoElement = videoRef.current[videoId];

    if (videoElement) {
        const currentTime = videoElement.currentTime;
        const duration = videoElement.duration;

        if (duration > 0) {
            setProgress(prev => ({
                ...prev,
                [videoId]: (currentTime / duration) * 100 // Update progress for this video
            }));
        }
    }
    };
    return (
        <Box width={"100%"} height={"100%"} pl={"240px"}>
            {video?.map((video) => {
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
                                        }}
                                    >
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            poster={video.thumb_url}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                backgroundPosition: "center",
                                                borderRadius: "16px",
                                                objectFit: isLandscape
                                                    ? "contain"
                                                    : "cover",
                                            }}
                                            ref={(e) =>(videoRef.current[video.id] = e)}
                                            onTimeUpdate={() => handleTimeUpdate(video.id)}
                                        >
                                            <source src={video.file_url} />
                                        </video>
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
                                                {audio[video.id] > 0.1 ? (
                                                    <>
                                                        <IoVolumeHighOutline
                                                            color="#fff"
                                                            fontSize={"34px"}
                                                            cursor={"pointer"}
                                                            onClick={() =>
                                                                toggleVolume(
                                                                    video.id
                                                                )
                                                            }
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaVolumeXmark
                                                            color="#fff"
                                                            fontSize={"34px"}
                                                            cursor={"pointer"}
                                                            onClick={() =>
                                                                toggleVolume(
                                                                    video.id
                                                                )
                                                            }
                                                        />
                                                    </>
                                                )}
                                                <Slider
                                                    onChange={(e) =>
                                                        handleVolumeChange(
                                                            video.id,
                                                            e
                                                        )
                                                    }
                                                    aria-label="Volume"
                                                    min={0}
                                                    max={1}
                                                    step={0.01}
                                                    value={
                                                        track[video.id] !==
                                                        undefined
                                                            ? track[video.id]
                                                            : 0.5
                                                    }
                                                    sx={{
                                                        color: "rgba(0,0,0,0.87)",
                                                        "& .MuiSlider-track": {
                                                            border: "none",
                                                        },
                                                        "& .MuiSlider-thumb": {
                                                            width: 12,
                                                            height: 12,
                                                            backgroundColor:
                                                                "#fff",
                                                            "&::before": {
                                                                boxShadow:
                                                                    "0 4px 8px rgba(0,0,0,0.4)",
                                                            },
                                                            "&:hover, &.Mui-focusVisible, &.Mui-active":
                                                                {
                                                                    boxShadow:
                                                                        "none",
                                                                },
                                                        },
                                                    }}
                                                />
                                            </Stack>
                                            <div>
                                                <Tippy
                                                    placement="right-start"
                                                    interactive
                                                    // visible
                                                    offset={[0, 20]}
                                                    render={(attrs) => (
                                                        <div
                                                            className="box"
                                                            tabIndex="-1"
                                                            {...attrs}
                                                        >
                                                            <Stack
                                                                bgcolor={"#fff"}
                                                                boxShadow={
                                                                    "rgba(0, 0, 0, 0.12) 0px 2px 12px"
                                                                }
                                                                p={"4px 0"}
                                                                borderRadius={
                                                                    "8px"
                                                                }
                                                            >
                                                                <Stack
                                                                    direction={"row"}
                                                                    alignItems={"center"}
                                                                    justifyContent={"flex-start"}
                                                                    p={"8px 24px 8px 14px"}
                                                                    gap={1}
                                                                    sx={{
                                                                        cursor: "pointer",
                                                                        ":hover": {backgroundColor:"#e7e7e7",},
                                                                    }}
                                                                >
                                                                    <MdKeyboardDoubleArrowUp
                                                                        fontSize={"16px"}
                                                                    />
                                                                    <span>
                                                                        Auto
                                                                        scroll
                                                                    </span>
                                                                    <Switch
                                                                        sx={{
                                                                            "& .MuiSwitch-thumb":
                                                                                {
                                                                                    width: "34px",
                                                                                    height: "10px",
                                                                                    transform:"translate(-20px,-2.7px)"
                                                                                },
                                                                            "& .MuiSwitch-input":
                                                                                {
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
                                                                        ":hover":
                                                                            {
                                                                                backgroundColor:
                                                                                    "#e7e7e7",
                                                                            },
                                                                    }}
                                                                >
                                                                    <LuHeartCrack
                                                                        fontSize={
                                                                            "16px"
                                                                        }
                                                                    />
                                                                    <span>
                                                                        Not
                                                                        interested
                                                                    </span>
                                                                </Stack>
                                                                <Stack
                                                                    direction={"row"}
                                                                    alignItems={"center"}
                                                                    justifyContent={"flex-start"}
                                                                    p={"8px 24px 8px 14px"}
                                                                    gap={1}
                                                                    sx={{
                                                                        cursor: "pointer",
                                                                        ":hover":
                                                                            {
                                                                                backgroundColor:
                                                                                    "#e7e7e7",
                                                                            },
                                                                    }}
                                                                >
                                                                    <CiFlag1
                                                                        fontSize={"16px"}
                                                                    />
                                                                    <span>
                                                                        Report
                                                                    </span>
                                                                </Stack>
                                                            </Stack>
                                                        </div>
                                                    )}
                                                >
                                                    <div>
                                                        <FaEllipsis color="#fff" fontSize={"20px"}/>
                                                    </div>
                                                </Tippy>
                                            </div>
                                        </Stack>
                                        <Stack position={"absolute"} bottom={"-10px"} left={0} right={0}>
                                            <Stack alignItems={"center"} direction={"row"}>
                                                <Typography fontWeight={"bold"} color={"#fff"} ml={2} mb={1}>{video.user.nickname}</Typography>
                                            </Stack>
                                            <Stack alignItems={"center"} direction={"row"}>
                                                <Typography color={"#fff"} ml={2} mb={1}>{video.description}</Typography>
                                            </Stack>
                                            {
                                                video.music && 
                                                <Stack alignItems={"center"} direction={"row"}>
                                                    <Typography color={"#fff"} ml={2} mb={1} display={"flex"} alignItems={"center"}> <CiMusicNote1 color="#fff" style={{marginRight:"8px"}}/> {video.music}</Typography>
                                                </Stack>
                                            }
                                            <Stack alignItems={"center"} direction={"row"} width={"100%"}>                                                
                                                <Slider value={progress[video.id] || 0} onChange={e => handleProgressChange(e,video)} min={0} max={100} step={1} sx={{
                                                    width:"100%",
                                                    '& .MuiSlider-thumb': {
                                                        width:"10px",
                                                        height:"10px",
                                                        backgroundColor:"#fff", 
                                                    },
                                                    '& .MuiSlider-rail': {
                                                        backgroundColor:"rgb(126 120 119)"
                                                    },
                                                    '& .MuiSlider-track': {
                                                        backgroundColor:"rgb(254 44 85)",
                                                        border:"none"
                                                    }
                                                }} />
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>
                            <Stack
                                direction={"column"}
                                justifyContent={"flex-end"}
                                alignItems={"center"}
                                height={"100%"}
                            >
                                <Box>
                                    <Typography width={"40px"} height={"40px"}>
                                        <img
                                            src={video.user.avatar}
                                            alt="avatar"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </Typography>
                                </Box>
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                >
                                    <Typography
                                        component={"span"}
                                        width={"38px"}
                                        height={"38px"}
                                        bgcolor={"rgba(22, 24, 35, 0.06)"}
                                        borderRadius={"50%"}
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        m={"8px 0 6px 0"}
                                        sx={{
                                            transition: "all 0.3s ease",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <FaHeart fontSize={"16px"} />
                                    </Typography>
                                    <strong
                                        style={{
                                            color: "rgba(22, 24, 35, 0.75)",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {video.likes_count}
                                    </strong>
                                </Box>
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                >
                                    <Typography
                                        component={"span"}
                                        width={"38px"}
                                        height={"38px"}
                                        bgcolor={"rgba(22, 24, 35, 0.06)"}
                                        borderRadius={"50%"}
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        m={"8px 0 6px 0"}
                                        sx={{
                                            transition: "all 0.3s ease",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <AiFillMessage fontSize={"16px"} />
                                    </Typography>
                                    <strong
                                        style={{
                                            color: "rgba(22, 24, 35, 0.75)",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {video.comments_count}
                                    </strong>
                                </Box>
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                >
                                    <Typography
                                        component={"span"}
                                        width={"38px"}
                                        height={"38px"}
                                        bgcolor={"rgba(22, 24, 35, 0.06)"}
                                        borderRadius={"50%"}
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        m={"8px 0 6px 0"}
                                        sx={{
                                            transition: "all 0.3s ease",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <IoIosShareAlt fontSize={"16px"} />
                                    </Typography>
                                    <strong
                                        style={{
                                            color: "rgba(22, 24, 35, 0.75)",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {video.comments_count}
                                    </strong>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                );
            })}
        </Box>
    );
}
