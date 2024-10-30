/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import { LikeApost } from "../../../services/likes/LikeVideo";
import { useContext, useState } from "react";
import { UnlikeApost } from "../../../services/likes/UnlikeVideo";
import styled from "styled-components";
import { Auth } from "../../context/AuthContext";
import { Videos } from "../../context/VideoContext";
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
export default function LikePost({ video }) {
    const auth = useContext(Auth);
    const [isLike, setIsLike] = useState(video.is_liked);
    const {setListVideoHome} = useContext(Videos);    
    const [count, setCount] = useState(video?.likes_count);
    const handleLikeVideo = (id) => {
        async function likeVideo() {
            const res = await LikeApost(id, auth.userAuth.meta.token);
            setIsLike(true);
            setCount(prev => prev+1);
            setListVideoHome(prev => {  
                const videoId = res.id;
                const updatedList = prev.map(video => {  
                    if (video.id === videoId) {  
                        const newIsLiked = res.is_liked;
                        const savedLikes = JSON.parse(localStorage.getItem('likedVideos')) || {};  
                        savedLikes[videoId] = newIsLiked;  
                        localStorage.setItem('likedVideos', JSON.stringify(savedLikes));  
                        return { ...video, is_liked: newIsLiked };  
                    }  
                    return video;  
                });  
                return updatedList;  
            }); 
        }
        likeVideo();
    };
    const handleUnLikeVideo = (id) => {
        async function UnlikeVideo() {
            const res = await UnlikeApost(id, auth.userAuth.meta.token);
            setIsLike(false);
            setCount(prev => prev-1)
            setListVideoHome(prev => {  
                const videoId = res.id;
                const updatedList = prev.map(video => {  
                    if (video.id === videoId) {  
                        const newIsLiked = res.is_liked; 
                        const savedLikes = JSON.parse(localStorage.getItem('likedVideos')) || {};  
                        savedLikes[videoId] = newIsLiked;  
                        localStorage.setItem('likedVideos', JSON.stringify(savedLikes));  
                        return { ...video, is_liked: newIsLiked };  
                    }  
                    return video;  
                });  
                return updatedList;  
            }); 
        }
        UnlikeVideo();
    };
    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
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
                }}
            >
                {count}
            </strong>
        </Box>
    );
}
