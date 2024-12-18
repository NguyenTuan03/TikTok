/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import { LikeApost } from "../../../services/likes/LikeVideo";
import { useContext, useEffect, useState } from "react";
import { UnlikeApost } from "../../../services/likes/UnlikeVideo";
import styled from "styled-components";
import { Auth } from "../../context/AuthContext";
let Typography = styled.span`
    width: 38px;
    height: 38px;
    background-color: rgba(22, 24, 35, 0.06);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0 6px 0;
    transition: all 0.3s ease;
    cursor: pointer;
`;
export default function LikePost({ video, direction = "column", gap="0" }) {
    const auth = useContext(Auth);
    const [isLike, setIsLike] = useState(video?.is_liked);    
    const [count, setCount] = useState(video?.likes_count);
    useEffect(() => {
        setIsLike(video?.is_liked);  
        setCount(video?.likes_count);  
    }, [video?.is_liked,video?.likes_count ])
    const handleLikeVideo = (id) => {
        async function likeVideo() {
            const res = await LikeApost(id, auth.userAuth.meta.token);
            console.log(res);            
            setIsLike(true);
            setCount(prev => prev+1);            
        }
        likeVideo();
    };
    const handleUnLikeVideo = (id) => {
        async function UnlikeVideo() {
            const res = await UnlikeApost(id, auth.userAuth.meta.token);
            console.log(res);            
            setIsLike(false);
            setCount(prev => prev-1)            
        }
        UnlikeVideo();
    };
    return (
        <Box display={"flex"} flexDirection={direction} alignItems={"center"}>
            {isLike ? (
                <Typography onClick={() => handleUnLikeVideo(video.id)}>
                    <FaHeart fontSize={"16px"} color="red" />
                </Typography>
            ) : (
                <Typography onClick={() => handleLikeVideo(video.id)}>
                    <FaHeart fontSize={"16px"} color="#000" />
                </Typography>
            )}
            <strong
                style={{
                    color: "rgba(22, 24, 35, 0.75)",
                    fontSize: "14px",
                    marginLeft:gap
                }}
            >
                {count}
            </strong>
        </Box>
    );
}
