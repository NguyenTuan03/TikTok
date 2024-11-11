/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import Image from "./../../component/image/Image";
import Button from "../../component/button/Button";
import {
    EmbeddedIcon,
    FacebookIcon,
    RepostIcon,
    ShareIcon,
} from "../../component/icon/Icon";
import LikePost from "../../component/viewvideo/videoDetail/LikePost";
import { AiFillMessage } from "react-icons/ai";
import { IoMusicalNotesSharp } from "react-icons/io5";
import React, { useContext, useEffect, useState } from "react";
import { getListComments } from "./../../services/comments/GetListComments";
import { Auth } from "../../component/context/AuthContext";
import ListComments from "../../component/listComments/ListComments";
import CommentTextBox from "../../component/CommentTextBox/CommentTextBox";
import { postComment } from "../../services/comments/PostComment";
import { followUserAPI } from "../../services/follow/FollowUser";
import { unfollowUserAPI } from "../../services/follow/UnfollowUser";
import PropTypes from 'prop-types';
import { scrollbar } from './../../style/scrollbar/ScrollBar';
export default function Comment({ data, statePosition, stateVideo, stateId }) {
    const { userAuth } = useContext(Auth);
    const [dataComments, getDataComments] = useState([]);
    const [positionVideo] = statePosition;
    const [listVideo] = stateVideo;
    const [idVideo] = stateId;
    const [isFollow, setIsFollow] = useState(data?.user?.is_followed);

    const [comment, setComment] = useState("");
    const [commentCount, setCommentCount] = useState(dataComments?.length);    
    useEffect(() => {
        setIsFollow(data?.user?.is_followed)
    }, [data]);
    useEffect(() => {
        fetchComments(idVideo);
        return () => {
            getDataComments([]);
            setCommentCount(0);
        };
    }, [positionVideo, listVideo, idVideo]);
    useEffect(() => {
        setCommentCount(dataComments?.length);
    }, [dataComments]);
    async function fetchComments(id) {
        const res = await getListComments(id, userAuth.meta.token);
        getDataComments(res);
        console.log(res);
    }

    const convertToTime = (time) => {
        const givenTime = new Date(time);
        const currentTime = new Date();

        if (isNaN(givenTime.getTime())) {
            return "Invalid date format";
        }

        const timeDiff = currentTime - givenTime;

        const secondsAgo = Math.floor(timeDiff / 1000);
        const minutesAgo = Math.floor(secondsAgo / 60);
        const hoursAgo = Math.floor(minutesAgo / 60);
        const daysAgo = Math.floor(hoursAgo / 24);
        const monthsAgo =
            (currentTime.getFullYear() - givenTime.getFullYear()) * 12 +
            (currentTime.getMonth() - givenTime.getMonth());
        const yearsAgo = currentTime.getFullYear() - givenTime.getFullYear();

        if (yearsAgo > 0) {
            return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
        } else if (monthsAgo > 0) {
            return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
        } else if (daysAgo > 0) {
            return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
        } else if (hoursAgo > 0) {
            return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
        } else if (minutesAgo > 0) {
            return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
        } else {
            return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
        }
    };
    const handlePostComment = async () => {
        if (comment.length < 0) {
            return;
        }
        const res = await postComment(comment, data.uuid, userAuth.meta.token);
        if (res.status) {
            console.log(res);
        } else {
            setCommentCount((prev) => prev + 1);
            fetchComments(idVideo);
            setComment("");
        }
    };
    const handleFollow = (id) => {
        const fetchFollow = async () => {
            const res = await followUserAPI(id, userAuth.meta.token);
            if (!res.status) {
                setIsFollow((prev) => !prev);
            }
        };
        fetchFollow();
    };
    const handleUnFollow = (id) => {
        const fetchUnFollow = async () => {
            const res = await unfollowUserAPI(id, userAuth.meta.token);
            if (!res.status) {
                setIsFollow((prev) => !prev);
            }
        };
        fetchUnFollow();
    };
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    };
    return (
        <Stack flex={"0 0 544px"} width={"544px"}>
            <Stack
                width={"100%"}
                boxSizing={"border-box"}
                borderBottom={"1px solid rgba(22, 24, 35, 0.2)"}
                overflow={"hidden auto"}
                flex={1}
                borderTop={"none"}
                padding={"24px 32px"}
                sx={scrollbar}
            >
                <Box
                    bgcolor={"rgba(22, 24, 35, 0.03)"}
                    borderRadius={"12px"}
                    padding={"16px"}
                    marginBottom={"16px"}
                >
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={2}
                        marginBottom={"15px"}
                    >
                        <Image
                            src={data?.user.avatar}
                            width={"40px"}
                            height={"40px"}
                            borderRadius
                        />
                        <Box flex={1}>
                            <Button
                                padding="0"
                                to={`/@${data?.user?.nickname}`}
                            >
                                {data?.user?.last_name +
                                    " " +
                                    data?.user?.first_name ||
                                    data?.user?.nickname}
                            </Button>
                            <Stack direction={"row"}>
                                <Typography>{data?.user.nickname}</Typography>
                                <Typography padding={"0 4px"}>.</Typography>
                                <Typography>
                                    {data?.published_at
                                        .split(" ")[0]
                                        .substring(5)}
                                </Typography>
                            </Stack>
                        </Box>                        
                        {!isFollow ? (
                            <Button
                                padding="8px 18px"
                                primary={true}
                                onClick={() => handleFollow(data.user.id)}
                            >
                                Follow
                            </Button>
                        ) : (
                            <Button
                                padding="8px 18px"
                                border={"1px solid rgb(22 24 35 / 12%)"}
                                onClick={() => handleUnFollow(data.user.id)}
                            >
                                Following
                            </Button>
                        )}
                    </Stack>
                    <Typography
                        fontSize={"16px"}
                        component={"div"}
                        marginBottom={"10px"}
                    >
                        {data?.description}
                    </Typography>
                    {data?.music && (
                        <Typography
                            fontSize={"14px"}
                            component={"div"}
                            display={"flex"}
                            alignItems={"center"}
                            gap={1}
                        >
                            <IoMusicalNotesSharp />
                            {data?.music}
                        </Typography>
                    )}
                </Box>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    height={"32px"}
                >
                    <Stack direction={"row"} alignItems={"center"} gap={2}>
                        <Typography
                            component={"button"}
                            display={"flex"}
                            alignItems={"center"}
                            border={"none"}
                            bgcolor={"transparent"}
                        >
                            <LikePost gap="10px" video={data} direction="row" />
                        </Typography>
                        <Typography
                            component={"button"}
                            display={"flex"}
                            alignItems={"center"}
                            border={"none"}
                            bgcolor={"transparent"}
                        >
                            <Box
                                width={"38px"}
                                height={"38px"}
                                bgcolor={"rgba(22, 24, 35, 0.06)"}
                                borderRadius={"50%"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                m={"8px 10px 6px 0"}
                                sx={{
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                }}
                            >
                                <AiFillMessage fontSize={"16px"} />
                            </Box>
                            <Typography
                                color={"rgba(22, 24, 35, 0.75)"}
                                fontSize={"12px"}
                                fontWeight={"bold"}
                            >
                                {commentCount}
                            </Typography>
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} gap={1}>
                        <Typography component="span">
                            <RepostIcon width="24px" height="24px" />
                        </Typography>
                        <Typography component="span">
                            <EmbeddedIcon width="24px" height="24px" />
                        </Typography>
                        <Typography component="span">
                            <ShareIcon width="24px" height="24px" />
                        </Typography>
                        <Typography component="span">
                            <FacebookIcon width="24px" height="24px" />
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    mt={"16px"}
                    direction={"row"}
                    alignItems={"center"}
                    color={"rgba(22, 24, 35, 0.75)"}
                    fontSize={"14px"}
                    border={"1px solid rgba(22, 24, 35, 0.12)"}
                    borderRadius={"8px"}
                    lineHeight={"18px"}
                >
                    <Typography
                        flex={"1 1 auto"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        whiteSpace={"nowrap"}
                        component={"p"}
                        fontSize={"14px"}
                        p={"7px 0 7px 12px"}
                        bgcolor={"rgba(22, 24, 35, 0.06)"}
                    >
                        {window.location.pathname}
                    </Typography>
                    <Typography
                        flex={"0 0 auto"}
                        border={"none"}
                        bgcolor={"none rgba(22, 24, 35, 0.06)"}
                        component={"button"}
                        color={"rgb(22, 24, 35)"}
                        fontWeight={"700"}
                        padding={"7px 18px"}
                        fontSize={"14px"}
                        sx={{
                            outline: "none",
                            cursor: "pointer",
                            ":hover": {
                                backgroundColor: "rgba(255, 255, 255)",
                            },
                        }}
                        onClick={handleCopyLink}
                    >
                        Copy link
                    </Typography>
                </Stack>

                <Stack
                    width={"100%"}
                    direction={"row"}
                    alignItems={"center"}
                    height={"50px"}
                    paddingTop={"18px"}
                    borderBottom={"2px solid rgb(22, 24, 35)"}
                    marginBottom={"24px"}
                >
                    <Typography
                        fontWeight={"700"}
                        width={"100%"}
                        fontSize={"14px"}
                        textAlign={"center"}
                    >
                        Comments
                        <Typography
                            fontWeight={"700"}
                            fontSize={"14px"}
                            component={"span"}
                            marginLeft={"4px"}
                        >
                            ({commentCount})
                        </Typography>
                    </Typography>
                </Stack>
                {dataComments &&
                    dataComments.map((cmt, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ListComments
                                    index={index}
                                    data={cmt}
                                    onFunction={convertToTime}
                                    getComments={getDataComments}
                                    setCount={setCommentCount}
                                />
                            </React.Fragment>
                        );
                    })}
            </Stack>
            <Box
                flex={"0 0 auto"}
                padding={"20px 0"}
                margin={"0 30px"}
                bgcolor={"#fff"}
            >
                <CommentTextBox
                    title={"Add comment..."}
                    commentState={[comment, setComment]}
                    onPost={handlePostComment}
                />
            </Box>
        </Stack>
    );
}
Comment.propTypes = {
    data: PropTypes.object
}