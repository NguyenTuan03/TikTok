import { Box, Stack } from "@mui/material";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-hook-inview";
import { getVideoList } from "./../../services/videos/GetVideoList";
import { Videos } from "../../component/context/VideoContext";
import ViewVideo from "../../component/viewvideo/ViewVideo";
import VideoDetail from "../../component/viewvideo/videoDetail/VideoDetail";
import { Auth } from "../../component/context/AuthContext";
let i = 2;
export default function Home() {
    const listRef = useRef(null);
    const { setListVideo, setListVideoHome, listVideoHome } =useContext(Videos);
    const [listVideoUser, setListVideoUser] = useState([]);
    const [ref, isVisible] = useInView({ threshold: 0.5 });    
    const {userAuth} = useContext(Auth)    
    
    useEffect(() => {
        setListVideoUser(listVideoHome);
    }, [listVideoHome]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const result = await getVideoList(i,userAuth.meta.token);
                console.log(result);                

                setListVideo(result.data);  
                localStorage.setItem('listvideos',JSON.stringify(result.data));  
                setListVideoHome(result.data);  
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchInitialData();
    }, []);
    
    useEffect(() => {  
        const fetchMoreData = async () => {  
            if (!isVisible) return;  

            try {  
                const oldScrollTop = listRef.current.scrollTop;  
                const oldScrollHeight = listRef.current.scrollHeight;  

                const result = await getVideoList(++i);  
                setListVideoHome((prevVideoList) => [  
                    ...prevVideoList,  
                    ...result.data,  
                ]);  
                
                setTimeout(() => {  
                    const newScrollHeight = listRef.current.scrollHeight;  
                    listRef.current.scrollTop = oldScrollTop + (newScrollHeight - oldScrollHeight);  
                }, 1000);  
            } catch (error) {  
                console.error("Error fetching more data:", error);  
            }  
        };  

        if (isVisible) {  
            fetchMoreData();              
        }  
    }, [isVisible]);  

    useEffect(() => {  
        const savedPosition = localStorage.getItem('videoIndex');                  
        if (savedPosition) {  
            const index = parseInt(savedPosition, 10);  
            if (index >= 0 && index < listVideoUser.length) { 
                scrollToVideo(index);   
            }  
        }  
    }, [listVideoUser]);

    const renderVideo = useMemo(() => {                
        return listVideoUser?.map((video, index) => {
            const isLandscape = video.meta.video.resolution_x > video.meta.video.resolution_y;
            return (
                <Stack
                    key={video.id}
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
    
    const scrollToVideo = (index) => {          
        const videoEle = listRef.current.children[index];                  
        if (videoEle) {  
            videoEle.scrollIntoView({ behavior: 'auto' });  
        }  
    };       
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
                sx={{ scrollSnapAlign: "start" }}
            >
                loading...
            </Box>
        </Box>
    );
}
