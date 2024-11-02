import { Stack } from "@mui/material";
import Video from "./Video";
import Comment from "./Comment";
import { useContext, useEffect, useState } from "react";
import { Videos } from "../../component/context/VideoContext";
import { Auth } from "../../component/context/AuthContext";
import { getAVideo } from "./../../services/videos/GetAVideo";

export default function FullVideo() {
    const { setListVideo, listVideo, setPositionVideo, positionVideo,setIdVideo,idVideo } =
        useContext(Videos);
    const { userAuth } = useContext(Auth);
    const [video, setVideo] = useState({});

    useEffect(() => {
        const uuidVideo = listVideo[positionVideo]?.uuid;
        fetchApi(uuidVideo);
    }, [positionVideo, listVideo]);

    async function fetchApi(uuidVideo) {
        const res = await getAVideo(
            uuidVideo ?? window.location.pathname.split("/")[3],
            userAuth.meta.token
        );
        console.log(res);
        setIdVideo(res.data.id);
        setVideo(res);
    }
    const handlePrevVideo = () => {};
    const handleNextVideo = () => {};
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
                statePosition={[positionVideo, setPositionVideo]}
                stateVideo={[listVideo,setListVideo]}
                stateId = {[idVideo,setIdVideo]}
            />
        </Stack>
    );
}
