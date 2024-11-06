/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Image from "../image/Image";
import { EllipsisHorizon, FlagIcon, HeartIcon } from "../icon/Icon";
import Tippy from "@tippyjs/react/headless";
import { FaRegTrashAlt } from "react-icons/fa";
import { Auth } from "../context/AuthContext";
import { deleteComment } from "../../services/comments/DeleteComments";
export default function ListComments({ data, index, onFunction = () => {}, getComments,setCommentCount }) {
    const [isLoading, setIsLoading] = useState(false);
    const [likeComment, setLikeComment] = useState(data?.is_liked);
    const [likeCounts, setLikeCounts] = useState(data?.likes_count);
    const {userAuth,setDataForm,setOpenFormDelete} = useContext(Auth);    
    
    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 700);
    }, []);
    const handleDeleteComment = (id) => {
        setDataForm({
            title: "Are you sure you want to delete?",
            handle: async() => {
                await deleteComment(id,userAuth.meta.token)    
                getComments((prev) => prev.filter((_, i) => i !== index))
                setCommentCount((prev) => prev - 1);
                setOpenFormDelete(false)
            }
        })
        setOpenFormDelete(true);
    }
    return (
        <React.Fragment key={index}>
            <Box mb={"20px"}>
                {!isLoading && (
                    <Stack
                        direction={"row"}
                        alignItems={"flex-start"}
                        marginBottom={"8px"}
                        sx={{
                            ":hover": {
                                "& .ellipsisHorizon": {
                                    opacity: 1,
                                },
                            },
                        }}
                    >
                        <Image
                            src={data?.user?.avatar}
                            width={"40px"}
                            height={"40px"}
                            borderRadius={true}
                            mr="12px"
                        />
                        <Stack flex={1} justifyContent={"flex-start"}>
                            <Typography fontSize={"14px"} color={"#161823"}>
                                {(data?.first_name || data?.last_name) ??
                                    data?.user?.nickname}
                            </Typography>
                            <Typography component={"p"} fontSize={"16px"}>
                                {data?.comment}
                            </Typography>
                            <Typography component={"p"} fontSize={"14px"}>
                                <Typography
                                    color={"rgba(22, 24, 35, 0.5)"}
                                    component={"span"}
                                    marginRight={"12px"}
                                >
                                    {onFunction(data?.updated_at)}
                                </Typography>
                                <Typography
                                    color={"rgba(22, 24, 35, 0.5)"}
                                    component={"span"}
                                >
                                    Reply
                                </Typography>
                            </Typography>
                        </Stack>
                        <Stack>
                            <Tippy
                                // visible
                                interactive
                                moveTransition="all 0.2s ease-in-out"
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div
                                        className="box"
                                        tabIndex={-1}
                                        {...attrs}
                                    >
                                        <Box width={"160px"} height={"50px"} boxShadow={"rgba(0, 0, 0, 0.22) 2px 2px 14px"} borderRadius={"5px"} zIndex={999} bgcolor={"#fff"} sx={{cursor:"pointer"}}>
                                            {
                                                userAuth?.data?.id === data?.user?.id ? 
                                                <Box onClick={() => handleDeleteComment(data?.id)} display={"flex"} direction={"row"} alignItems={"center"} width={"100%"} height={"100%"} fontSize={"16px"} pl={1.5} sx={{":hover": {color:"rgba(254, 44, 85, 1)"}}}>
                                                    <FaRegTrashAlt fontSize={"18px"}/>
                                                    <Typography fontWeight={"600"} fontSize={"14px"} ml={1.5}>Delete</Typography>
                                                </Box>
                                                 :
                                                <Box display={"flex"} direction={"row"} alignItems={"center"} width={"100%"} height={"100%"} fontSize={"14px"} pl={1.5} sx={{":hover": {color:"rgba(254, 44, 85, 1)"}}}>
                                                    <FlagIcon/>
                                                    <Typography fontWeight={"600"} fontSize={"14px"} ml={1.5}>Report</Typography>
                                                </Box>
                                            }
                                        </Box>
                                    </div>
                                )}
                            >
                                <Typography
                                    component={"span"}
                                    className="ellipsisHorizon"
                                    sx={{ opacity: 0 }}
                                >
                                    <EllipsisHorizon
                                        color="#000"
                                        width="18px"
                                        height="18px"
                                    />
                                </Typography>
                            </Tippy>
                            <Stack
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Typography component={"span"}>
                                    <HeartIcon
                                        color={
                                            likeComment
                                                ? "red"
                                                : "rgba(22, 24, 35, 0.5)"
                                        }
                                    />
                                </Typography>
                                <Typography
                                    fontSize={"14px"}
                                    component={"span"}
                                    color={"rgba(22, 24, 35, 0.5)"}
                                >
                                    {likeCounts}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                )}
            </Box>
        </React.Fragment>
    );
}
