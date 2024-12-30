import { Stack } from "@mui/material";
import Video from "./Video";
import Comment from "./Comment";
import { useContext, useEffect, useState } from "react";
import { Videos } from "../../component/context/VideoContext";
import { Auth } from "../../component/context/AuthContext";
import { getAVideo } from "./../../services/videos/GetAVideo";
import { getVideoList } from "../../services/videos/GetVideoList";

export default function FullVideo() {
    const {
        setListVideo,
        listVideo,
        setPositionVideo,
        positionVideo,
        setIdVideo,
        idVideo,
        page,
        setPage,
    } = useContext(Videos);
    const { userAuth } = useContext(Auth);
    const [video, setVideo] = useState({});
    useEffect(() => {
        const savedListVideo = JSON.parse(localStorage.getItem("listvideos"));
        if (savedListVideo && savedListVideo.length !== 0) {
            setListVideo(savedListVideo);
        }
    }, [setListVideo]);
    useEffect(() => {
        const uuidVideo = listVideo[positionVideo]?.uuid;
        fetchApi(uuidVideo);
    }, [positionVideo, listVideo]);
    const fetchMoreVideos = async () => {
        try {
            const result = await getVideoList(page, userAuth.meta.token);
            setListVideo((prev) => {
                const updatedList = [...prev, ...result.data];
                localStorage.setItem("listvideos", JSON.stringify(updatedList));
                return updatedList;
            });
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };
    async function fetchApi(uuidVideo) {
        const res = await getAVideo(
            uuidVideo ?? window.location.pathname.split("/")[3],
            userAuth.meta.token
        );
        setIdVideo(res.data.id);
        setVideo(res);
    }
    useEffect(() => {
        const storedPosition = JSON.parse(localStorage.getItem("videoIndex"));
        setPositionVideo(Number(storedPosition));
    }, []);
    const handlePrevVideo = () => {
        localStorage.setItem("videoIndex", JSON.stringify(positionVideo - 1));
        setPositionVideo((prev) =>
            positionVideo <= 0 ? positionVideo : prev - 1
        );
    };
    const handleNextVideo = () => {                
        if (positionVideo === listVideo.length - 1) {
            setPage((prev) => prev + 1);
            fetchMoreVideos();
        }
        setPositionVideo((prev) => Math.min(prev + 1, listVideo.length - 1));
        localStorage.setItem("videoIndex", JSON.stringify(positionVideo + 1));
    };
    useEffect(() => {
        const handleKeyUp = (e) => {
            e.key === "ArrowDown" &&
                setPositionVideo((prev) =>
                    positionVideo >= listVideo.length - 1
                        ? positionVideo
                        : prev + 1
                );
            e.key === "ArrowUp" &&
                setPositionVideo((prev) =>
                    positionVideo <= 0 ? positionVideo : prev - 1
                );
        };
        const handleScroll = (e) => {
            console.log(e);
        };
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("scroll", handleScroll);
        return () => {
            removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [positionVideo, listVideo]);

    return (
        <Stack
            direction={"row"}
            position={"fixed"}
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
        >
            <Video
                onPrevPage={handlePrevVideo}
                onNextPage={handleNextVideo}
                data={video.data}
                position={positionVideo}
                listVideo={listVideo}
            />
            <Comment
                data={video.data}
                statePosition={[positionVideo]}
                stateVideo={[listVideo]}
                stateId={[idVideo]}
            />
        </Stack>
    );
}
