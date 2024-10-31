/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import Image from "./../../component/image/Image";
import Button from "../../component/button/Button";

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
                <Box bgcolor={"rgba(22, 24, 35, 0.03)"} borderRadius={"12px"} padding={"16px"} marginBottom={"16px"}>
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
                <Stack>
                  <Stack>
                    <Typography></Typography>
                    <Typography></Typography>
                    <Typography></Typography>
                  </Stack>
                  <Stack>
                    <Typography component="span"></Typography>
                    <Typography component="span"></Typography>
                    <Typography component="span"></Typography>
                    <Typography component="span"></Typography>
                    <Typography component="span"></Typography>
                  </Stack>
                </Stack>
                <Stack></Stack>
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
