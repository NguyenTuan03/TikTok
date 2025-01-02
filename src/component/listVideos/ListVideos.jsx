/* eslint-disable react/prop-types */
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Auth } from "../context/AuthContext";
import { useInView } from "react-hook-inview";
import { getVideoList } from "../../services/videos/GetVideoList";
import { Box, Stack } from "@mui/material";
import ViewVideo from "../viewvideo/ViewVideo";
import VideoDetail from "../viewvideo/videoDetail/VideoDetail";
import { Videos } from "../context/VideoContext";

export default function ListVideos({type}) {
    const listRef = useRef(null);
    const { setListVideo, page ,setPage } = useContext(Videos);
    const [listVideoUser, setListVideoUser] = useState([]);
    const [ref, isVisible] = useInView({ threshold: 0.5 });
    const [isLoading, setIsLoading] = useState(false);
    const {userAuth} = useContext(Auth)    
    useEffect(() => {
        setListVideo(listVideoUser);
        localStorage.setItem('listvideos',JSON.stringify(listVideoUser));
    }, [listVideoUser]);
    useEffect(() => {        
        const fetchInitialData = async () => {
            try {
                const result = await getVideoList(type,page,userAuth?.meta?.token || "");                
                setListVideoUser(prev => [...prev,...result.data])                                
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchInitialData();
    }, [page]);
    
    useEffect(() => {
        const handleScroll = () => {                 
            if (isVisible && !isLoading) {
                setIsLoading(true); 
                setPage((prev) => prev + 1);
            }
        };
        if (listRef.current) {
            listRef.current.addEventListener("scroll",handleScroll);
        }
        return () => {
            if (listRef.current) {
                listRef.current.removeEventListener("scroll",handleScroll);
            }
        } 
    }, [isVisible, isLoading]);
      
    const renderVideo = useMemo(() => {                
        return listVideoUser?.map((video, index) => {
            const isLandscape = video.meta.video.resolution_x > video.meta.video.resolution_y;
            return (
                <Stack
                    key={index}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={isLandscape ? "center" : "flex-start"}
                    p={"70px 0 20px 0"}
                    m={"0 auto"}
                    width={isLandscape ? "100%" : "450px"}
                    maxWidth={isLandscape ? "600px" : "600px"}
                    height={isLandscape ? "100vh" : "calc(-20px + 100vh)"}
                    sx={{ scrollSnapAlign: "center" }}
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
                                        ":hover .header_video": {
                                            display: "flex",
                                        },
                                    }}                                    
                                >
                                    <ViewVideo video={video} index={index}/>
                                </Box>
                            </Box>
                        </Box>
                        <Stack
                            direction={"column"}
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                            height={"100%"}
                        >
                            <VideoDetail video={video} index={index}/>
                        </Stack>
                    </Stack>
                </Stack>
            );
        });
    }, [listVideoUser]);    
        
    return (
        <Box
            ref={listRef}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            width={"100%"}
            maxHeight={"100vh"}
            sx={{
                scrollSnapType: "y mandatory",
                scrollbarWidth: "none",
                scrollSnapStop: "always",
                overflowY: "scroll",
                scrollBehavior:"smooth",
                "&::-webkit-scrollbar": { display: "none" },
            }}
        >
            {renderVideo}
            <Box
                ref={ref}
                display={"flex"}
                minHeight={"30px"}
                alignItems={"center"}
                justifyContent={"center"}                
            >
                loading...
            </Box>
        </Box>
    );
}

