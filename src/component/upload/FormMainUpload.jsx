/* eslint-disable react/prop-types */

import { Box, Stack, Typography } from "@mui/material";
import { UploadedIcon } from "../icon/Icon";
import PhonePreviewVideo from "./PhonePreviewVideo";
import Description from "./Description";
import CoverVideo from "./CoverVideo";
import { useCallback, useContext, useState } from "react";
import ViewAble from "./ViewAble";
import Allow from "./Allow";
import Button from "../button/Button";
import { Auth } from "./../context/AuthContext";
import { createAVideo } from "./../../services/videos/CreateAVideo";

export default function FormMainUpload({ url, nameFile, size }) {
    const [listThumbnails, setListThumbnails] = useState([]);
    const [captureTimeLeakVideo, setCaptureTimeLeakVideo] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [isFile, setIsFile] = useState(url);
    const { userAuth, setOpenFormDiscard } = useContext(Auth);
    const [cropData, setCropData] = useState(null);
    const [text, setText] = useState(nameFile);
    const [status, setStatus] = useState("public");
    const [allowed, setAllowed] = useState([]);
    const handleDiscardFile = useCallback(() => {
        setIsFile("");

        setListThumbnails([]);

        setOpenFormDiscard(false);
        URL.revokeObjectURL(isFile);
    });
    const handleUploadVideo = () => {
        const fetchApi = async () => {
            try {
                const response = await fetch(isFile);
                if (!response.ok) {
                    throw new Error("Failed to fetch the Blob from the URL.");
                }
                // const blob = await response.blob();
                // const file = new File([blob], "uploaded_video.mp4", { type: blob.type });
                const data = await createAVideo(
                    text,
                    isFile,
                    captureTimeLeakVideo,
                    `Original sound - ${userAuth.data.first_name} ${userAuth.data.last_name}`,
                    status,
                    allowed,
                    userAuth.meta.token
                );
                console.log("Upload response:", data);
            } catch (error) {
                console.error("Error in handleUploadVideo:", error);
            }
        };
        fetchApi();
    };
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
                            Size:
                        </Typography>
                        <Typography
                            component={"span"}
                            fontSize={"15px"}
                            fontWeight={"bold"}
                            color={"rgba(0,0,0,1)"}
                            marginLeft={"8px"}
                        >
                            {parseFloat(size / (1024 * 1024)).toFixed(2)}MB
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            component={"span"}
                            fontSize={"15px"}
                            fontWeight={400}
                            color={"rgba(0,0,0,0.65)"}
                        >
                            Duration:
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
            <Stack
                mt={"24px"}
                width={"100%"}
                height={"100%"}
                padding={"24px 24px 12px"}
                direction={"row"}
                gap={"45px"}
            >
                <Stack
                    width={"100%"}
                    gap={"45px"}
                    marginBottom={"24px"}
                    flex={"1 1 0%"}
                >
                    <Description stateText={[text, setText]} />
                    <CoverVideo
                        src={isFile}
                        stateList={[listThumbnails, setListThumbnails]}
                        stateValue={[maxValue, setMaxValue]}
                        stateTimeThumbnail={[setCaptureTimeLeakVideo]}
                        stateCropData={[cropData, setCropData]}
                        stateFile={[setIsFile]}
                    />
                    <ViewAble stateStatus={[status, setStatus]} />
                    <Allow stateAllowed={[setAllowed]} />
                    <Stack direction={"row"} alignItems={"center"} gap={"12px"}>
                        <Button
                            primary={true}
                            large={true}
                            onClick={handleUploadVideo}
                        >
                            Post
                        </Button>
                        <Button
                            onClick={handleDiscardFile}
                            cancel={true}
                            large={true}
                        >
                            Discard
                        </Button>
                    </Stack>
                </Stack>
                <Box flex={"0 0 305px"}>
                    <PhonePreviewVideo
                        user={userAuth}
                        stateFiles={[isFile]}
                        descript={text}
                        cropData={cropData}
                    />
                </Box>
            </Stack>
        </Box>
    );
}
