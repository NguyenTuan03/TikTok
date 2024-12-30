/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import { useContext } from "react";
import { AiFillMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../context/AuthContext";
import { Videos } from "../../context/VideoContext";
export default function CommentPost({ video, index }) {    
    const nav = useNavigate();
    const {setIdVideo} = useContext(Auth);
    const {setPositionVideo} = useContext(Videos);
    const handleGetVideo = () => {
        setTimeout(() => {
            nav(`/${video.user.nickname}/video/${video.uuid}`)
            window.location.reload();
        }, 100);
        setIdVideo(video.id);
        setPositionVideo(index);
        localStorage.setItem('videoIndex',JSON.stringify(index));  
    }
    return (
        <Stack alignItems={"center"} onClick={handleGetVideo}>
            <Box
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
            </Box>
            <strong
                style={{
                    color: "rgba(22, 24, 35, 0.75)",
                    fontSize: "14px",
                }}
            >
                {video?.comments_count}
            </strong>
        </Stack>
    );
}
