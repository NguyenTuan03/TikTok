/* eslint-disable react/prop-types */

import { Box, Stack, Typography } from "@mui/material";
import { UploadedIcon } from "../icon/Icon";
import PhonePreviewVideo from "./PhonePreviewVideo";
import Description from "./Description";
import CoverVideo from "./CoverVideo";
import { useState } from "react";

export default function FormMainUpload({ url, nameFile }) {
    console.log(url);
    console.log(nameFile);
    
    const [listThumbnails, setListThumbnails] = useState([]);
    const [captureTimeLeakVideo, setCaptureTimeLeakVideo] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [isFile, setIsFile] = useState(url);

    return (
        <Box width={"100%"} height={"100%"}>
            <Box width={"100%"} height={"100%"} padding={"24px 24px 12px"}>
                <Typography variant="h4" fontWeight={600}>
                    {nameFile}
                </Typography>
                <Stack direction={"row"} gap={2} alignItems={"center"}>
                    <Box>
                        <Typography
                            component={"span"}
                            fontSize={"15px"}
                            fontWeight={400}
                            color={"rgba(0,0,0,0.65)"}
                        >
                            Size:{" "}
                        </Typography>
                        <Typography
                            component={"span"}
                            fontSize={"15px"}
                            fontWeight={400}
                            color={"rgba(0,0,0,0.65)"}
                        >
                            Size:{" "}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            component={"span"}
                            fontSize={"15px"}
                            fontWeight={400}
                            color={"rgba(0,0,0,0.65)"}
                        >
                            Duration:{" "}
                        </Typography>
                        <Typography
                            component={"span"}
                            fontSize={"15px"}
                            fontWeight={400}
                            color={"rgba(0,0,0,0.65)"}
                        >
                            Size:{" "}
                        </Typography>
                    </Box>
                </Stack>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={1}
                    marginTop={"22px"}
                    fontSize={"16px"}
                    height={"20px"}
                    lineHeight={"19px"}
                    color={"#00c39b"}
                >
                    <UploadedIcon />
                    <Typography fontSize={"16px"}>Uploaded</Typography>
                </Stack>
            </Box>
            <Box
                mt={"24px"}
                width={"100%"}
                height={"100%"}
                padding={"24px 24px 12px"}
            >
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"100%"}
                    gap={"45px"}
                    marginBottom={"24px"}
                >
                    <Description />
                    <PhonePreviewVideo />
                </Stack>
                <CoverVideo
                    src={isFile}
                    stateList={[listThumbnails, setListThumbnails]}
                    stateValue={[maxValue, setMaxValue]}
                    stateTimeThumbnail={[setCaptureTimeLeakVideo]}
                />
            </Box>
        </Box>
    );
}
