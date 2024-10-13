/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import { IoIosShareAlt } from "react-icons/io";
import { FcRefresh } from "react-icons/fc";
import { IoCodeSlash } from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import Button from './../../button/Button';
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
const SHARED_MENU = [
    {
        id: 1,
        icon: <FcRefresh />,
        name: "Repost",
    },
    {
        id: 2,
        icon: <IoCodeSlash />,
        name: "Embed",
    },
    {
        id: 3,
        icon: <BsSend />,
        name: "Send to friends",
    },
    {
        id: 4,
        icon: <FaFacebook />,
        name: "Share to facebook",
    },
    {
        id: 5,
        icon: <IoIosLink />,
        name: "Copy link",
    },
    {
        id: 6,
        icon: <BsSend />,
        name: "Send to friends",
    },
    {
        id: 7,
        icon: <FaFacebook />,
        name: "Share to facebook",
    },
    {
        id: 8,
        icon: <IoIosLink />,
        name: "Copy link",
    },
];
export default function SharePost({ video }) {
    const [sharedHeight, setSharedHeight] = useState("280px");
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
        >
            <Tippy
                zIndex={999}
                placement="top-start"
                interactive
                onHide={() => setSharedHeight("280px")}
                delay={[100,400]}                
                arrow={true}
                moveTransition="all 0.2s ease-out"
                render={(attrs) => (
                    <Box className="box" tabIndex="-1" {...attrs}>
                        <Stack
                            gap={1.2}
                            width={"284px"}
                            height={sharedHeight}
                            bgcolor={"#fff"}
                            boxShadow={"rgb(0 0 0 / 43%) 0px 2px 12px"}
                            p={"10px 0 10px 0"}
                            borderRadius={"12px"}
                            alignItems={"flex-start"}
                            alignSelf={"flex-start"}
                            sx={{cursor:"pointer"}}
                        >
                            {
                                (sharedHeight === "280px") ? 
                                SHARED_MENU.slice(3).map(item => {
                                    return (
                                        <>
                                            <Button hover={true} whitebg={true} fullwidth={true} lefticon={item.icon} style={{textAlign:"start", display:"flex", paddingLeft:"14px"}}>{item.name}</Button>
                                        </>
                                    )
                                }) : SHARED_MENU.map(item => {
                                    return (
                                        <>
                                            <Button hover={true} whitebg={true} fullwidth={true} lefticon={item.icon} style={{textAlign:"start", display:"flex", paddingLeft:"14px"}}>{item.name}</Button>
                                        </>
                                    )
                                })
                            }
                            {
                                sharedHeight === "280px" && 
                                <Typography onClick={() => setSharedHeight("390px")} sx={{":hover": {bgcolor:"rgba(224, 224, 224, 0.401)"}}} component={"span"} width={"100%"} textAlign={"center"}><IoIosArrowDown fontSize={"24px"} fontWeight={"bold"}/></Typography>
                            }
                        </Stack>
                    </Box>
                )}
            >
                <Stack alignItems={"center"}>
                    <Typography
                        component={"span"}
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
                        <IoIosShareAlt fontSize={"16px"} />
                    </Typography>
                    <strong
                        style={{
                            color: "rgba(22, 24, 35, 0.75)",
                            fontSize: "14px",
                        }}
                    >
                        {video.comments_count}
                    </strong>
                </Stack>
            </Tippy>
        </Box>
    );
}
