import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getVideoList } from "../../services/GetVideoList";
import { FaHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
export default function Home() {
    const [video, setVideo] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getVideoList(1);
            console.log(result);
            setVideo(result.data);
        };
        fetchApi();
    }, []);
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
                                        >
                                            <source src={video.file_url} />
                                        </video>
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
                                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
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
                                    <strong style={{color:"rgba(22, 24, 35, 0.75)", fontSize:"14px"}}>
                                        {video.likes_count}
                                    </strong>
                                </Box>
                                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
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
                                    <strong style={{color:"rgba(22, 24, 35, 0.75)", fontSize:"14px"}}>
                                        {video.comments_count}
                                    </strong>
                                </Box>
                                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
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
                                    <strong style={{color:"rgba(22, 24, 35, 0.75)", fontSize:"14px"}}>
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
