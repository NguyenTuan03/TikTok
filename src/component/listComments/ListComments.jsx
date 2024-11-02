/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "../image/Image";
import { EllipsisHorizon, HeartIcon } from "../icon/Icon";

export default function ListComments({data, index, onFunction = () => {} }) {
    const [likeComment, setLikeComment] = useState(data?.is_liked)
    const [likeCounts, setLikeCounts] = useState(data?.likes_count);
    return (
        <React.Fragment key={index}>
            <Box mb={"20px"}>
                <Stack
                    direction={"row"}
                    alignItems={"flex-start"}
                    marginBottom={"8px"}
                    sx={{
                        ":hover": {
                            '& .ellipsisHorizon': {
                                opacity:1
                            }
                        }
                    }}
                >
                    <Image
                        src={data.user.avatar}
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
                        <Typography component={"span"} className="ellipsisHorizon" sx={{opacity:0}}>
                            <EllipsisHorizon color="#000" width="18px" height="18px"/>
                        </Typography>
                        <Stack justifyContent={"center"} alignItems={"center"}>
                            <Typography component={"span"}>
                                <HeartIcon color={likeComment ? 'red': 'rgba(22, 24, 35, 0.5)'}/>
                            </Typography>
                            <Typography fontSize={"14px"} component={"span"} color={"rgba(22, 24, 35, 0.5)"}>{likeCounts}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </React.Fragment>
    );
}
