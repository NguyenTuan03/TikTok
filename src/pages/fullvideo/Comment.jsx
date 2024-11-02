/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import Image from "./../../component/image/Image";
import Button from "../../component/button/Button";
import {
    EmbeddedIcon,
    FacebookIcon,
    RepostIcon,
    SendIcon,
    ShareIcon,
} from "../../component/icon/Icon";
import LikePost from "../../component/viewvideo/videoDetail/LikePost";
import { AiFillMessage } from "react-icons/ai";

export default function Comment({ data }) {
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
                                {data?.user.nickname}
                            </Button>
                            <Stack direction={"row"}>
                                <Typography>{data?.user.bio}</Typography>
                                <Typography padding={"0 4px"}>.</Typography>
                                <Typography>
                                    {data?.published_at
                                        .split(" ")[0]
                                        .substring(5)}
                                </Typography>
                            </Stack>
                        </Box>
                        <Button padding="8px 18px" primary={true}>
                            Follow
                        </Button>
                    </Stack>
                    <Typography fontSize={"16px"} component={"div"}>
                        {data?.description}
                    </Typography>
                    <Typography fontSize={"14px"} component={"div"}>
                        {data?.music}
                    </Typography>
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
                                {data?.comments_count}
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
                        sx={{ outline: "none", cursor: "pointer", ":hover": {
                            backgroundColor: "rgba(255, 255, 255)"
                        } }}
                    >
                        Copy link
                    </Typography>
                </Stack>
            </Stack>
            <Box
                flex={"0 0 auto"}
                padding={"20px 0"}
                margin={"0 30px"}
                bgcolor={"#fff"}
            ></Box>
        </Stack>
    );
}
