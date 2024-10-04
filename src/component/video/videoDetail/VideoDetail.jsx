/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import Image from "../../image/Image";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { useContext, useState } from "react";
import { Auth } from "../../accountItem/AuthContext";
import { followUserAPI } from "../../../services/follow/FollowUser";
import { unfollowUserAPI } from "../../../services/follow/UnfollowUser";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";

import styled from "styled-components";
import SharePost from "./SharePost";
let Stack = styled.div`
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
    `;
export default function VideoDetail({ video }) {
    const [isFollow, setIsFollow] = useState(false);
    const auth = useContext(Auth);

    const followAUser = (id) => {
        async function followApi() {
            const res = await followUserAPI(id, auth.userAuth.meta.token);
            console.log(res);
        }
        followApi();

        setIsFollow(!isFollow);
        console.log(id);
    };
    const unfollowAUser = (id) => {
        async function unfollowApi() {
            const res = await unfollowUserAPI(id, auth.userAuth.meta.token);
            console.log(res);
        }
        unfollowApi();

        setIsFollow(!isFollow);
        console.log(id);
    };
    return (
        <>
            <Box mb={2}>
                <Typography
                    width={"40px"}
                    height={"40px"}
                    position={"relative"}
                >
                    <Image
                        src={video.user.avatar}
                        width={"100%"}
                        height={"100%"}
                        borderRadius={true}
                    />
                    {!isFollow ? (
                        <Stack
                            onClick={() => followAUser(video.id)}
                            style={{
                                backgroundColor:"rgb(252 42 84)"
                            }}
                        >
                            <FaPlus color="#fff" />
                        </Stack>
                    ) : (
                        <Stack
                            onClick={() => unfollowAUser(video.id)}
                            style={{
                                backgroundColor:"#fff",
                                border:"1px solid rgb(227 227 228)"
                            }}
                        >
                            <FaCheck color="rgb(252 42 84)" />
                        </Stack>
                    )}
                </Typography>
            </Box>
            <LikePost video={video} />
            <CommentPost video={video} />
            <SharePost video={video} />
        </>
    );
}
