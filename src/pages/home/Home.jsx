import { Box, Stack } from "@mui/material";
import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import HeaderVideo from "../../component/video/HeaderVideo";
import FooterVideo from "../../component/video/FooterVideo";
import Video from "../../component/video/Video";
import { useInView } from "react-hook-inview";
import { getVideoList } from "./../../services/videos/GetVideoList";
import VideoDetail from "../../component/video/videoDetail/VideoDetail";
import { Videos } from "../../component/context/VideoContext";
let i = 2;
export default function Home() {
    const { videoList, setVideoList } = useContext(Videos);
    const listRef = useRef(null);
    const {setIsShowVolume} = useContext(Videos)
    const [ref, isVisible] = useInView({ threshold: 0.5 });
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const result = await getVideoList(i);
                console.log(result);
                setVideoList(result.data);
                setTimeout(() => {
                    listRef.current.scrollTop = 0;
                }, 0);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchInitialData();
    }, []);

    // useEffect(() => {
    //     let initialLoad = true;

    //     const fetchMoreData = async () => {
    //         if (initialLoad) {
    //             initialLoad = false;
    //             return;
    //         }

    //         if (!isVisible) return;

    //         try {
    //             const oldScrollTop = listRef.current.scrollTop;
    //             const oldScrollHeight = listRef.current.scrollHeight;

    //             const result = await getVideoList(++i);
    //             setVideoList((prevVideoList) => [
    //                 ...prevVideoList,
    //                 ...result.data,
    //             ]);

    //             setTimeout(() => {
    //                 const newScrollHeight = listRef.current.scrollHeight;
    //                 listRef.current.scrollTop =
    //                     oldScrollTop + (newScrollHeight - oldScrollHeight);
    //             }, 1000);
    //         } catch (error) {
    //             console.error("Error fetching more data:", error);
    //         }
    //     };

    //     if (isVisible) {
    //         fetchMoreData();
    //     }
    // }, [isVisible]);

    const renderVideo = useMemo(() => {
        return videoList?.map((video, index) => {
            const isLandscape =
                video.meta.video.resolution_x > video.meta.video.resolution_y;
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
                    // maxHeight={isLandscape ? "50vh" : "calc(100vh)"}
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
                                    }}
                                    onMouseEnter={() => setIsShowVolume(true)}
                                    onMouseLeave={() => setIsShowVolume(false)}
                                >
                                    <Video
                                        videoList={videoList}
                                        index={index}
                                        video={video}
                                        isLandscape={isLandscape}
                                    />
                                    <HeaderVideo video={video} />
                                    <FooterVideo video={video} />
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
        });
    }, [videoList]);
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
