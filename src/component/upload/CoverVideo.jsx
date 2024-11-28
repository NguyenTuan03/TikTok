/* eslint-disable react/prop-types */
import { Box, Modal, Slider, Stack, Typography } from "@mui/material";
import { InfoIcon } from "../icon/Icon";
import Image from "../image/Image";
import { useEffect, useRef, useState } from "react";
import { ConvertBase64 } from "./../../services/videos/ConvertBase64";
import Button from "./../button/Button";
import CropperBox from "./CropperBox";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "940px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "flex-start",
    boxSizing: "border-box",
};
export default function CoverVideo({
    src,
    stateList,
    stateValue,
    stateTimeThumbnail,
}) {
    const [listThumbnails, setListThumbnails] = stateList;
    const [changeValue, setChangeValue] = useState(0);
    const [maxValue, setMaxValue] = stateValue;
    const [setCaptureTimeLeakVideo] = stateTimeThumbnail;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const canvasRef = useRef();
    const videoFormRef = useRef();
    const thumbnailRef = useRef();
    const videoRef = useRef();
    const handleCapture = () => {
        canvasRef.current.width = videoFormRef.current.videoWidth;
        canvasRef.current.height = videoFormRef.current.videoHeight;

        canvasRef.current
            .getContext("2d")
            .drawImage(
                videoFormRef.current,
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );

        const imageUrl = canvasRef.current.toDataURL("image/jpeg", 1.0);

        return imageUrl;
    };
    useEffect(() => {
        let timeOut;
        let timeInterval;
        const handleCaptureFps = () => {
            if (videoFormRef.current) {
                const duration = videoFormRef.current.duration;
                let numberThumbnails = parseFloat(duration / 8);
                const prevValue = numberThumbnails;
                videoFormRef.current.currentTime = 0;
                setMaxValue(duration);
                timeOut = setTimeout(() => {
                    timeInterval = setInterval(async () => {
                        try {
                            if (numberThumbnails <= duration) {
                                const urlCapture = handleCapture();
                                const blobUrl = await ConvertBase64(
                                    urlCapture,
                                    "image/jpeg"
                                );

                                setListThumbnails((prev) => [...prev, blobUrl]);

                                numberThumbnails += prevValue;

                                videoFormRef.current.currentTime =
                                    numberThumbnails;
                            } else {
                                clearInterval(timeInterval);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }, 150);
                }, 250);
            }
        };
        if (videoFormRef.current) {
            videoFormRef.current.addEventListener(
                "loadeddata",
                handleCaptureFps
            );
        }
        return () => {
            if (videoFormRef.current) {
                videoFormRef.current.removeEventListener(
                    "loadeddata",
                    handleCaptureFps
                );
            }
            clearInterval(timeInterval);
            clearTimeout(timeOut);
        };
    }, [videoFormRef, src]);
    const handleChangeValue = (e) => {
        const current = Number(e.target.value);

        setChangeValue(current);
        setCaptureTimeLeakVideo(current);

        videoRef.current.currentTime = current;

        if (current >= maxValue.toFixed(0)) {
            thumbnailRef.current.style.transform = `translateX(600px) scale(1.1, 1.09)`;
        } else {
            thumbnailRef.current.style.transform = `translateX(calc(6 * (${
                videoRef.current.currentTime / videoRef.current.duration
            }) * 100px)) scale(1.1, 1.09)`;
        }
    };
    return (
        <Box>
            <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                marginBottom={"8px"}
            >
                <Typography fontSize={"14px"}>Cover</Typography>
                <InfoIcon />
            </Stack>
            <Box
                position={"relative"}
                width={"150px"}
                height={"200px"}
                onClick={handleOpen}
            >
                <Image />
                <Typography
                    position={"absolute"}
                    left={0}
                    bottom={0}
                    right={0}
                    bgcolor={"rgba(51, 51, 51, .6)"}
                    color={"#fff"}
                    padding={"10px 0"}
                    textAlign={"center"}
                    fontWeight={500}
                    fontSize={"14px"}
                >
                    Edit cover
                </Typography>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    border: "none",
                    outline: "none",
                }}
            >
                <Box sx={style}>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={1}
                        height={"84px"}
                        p={"0 22px 0 6px"}
                    >
                        <Typography padding={"0 18px"} fontSize={"24px"}>
                            Select cover
                        </Typography>
                        <Typography padding={"0 18px"} fontSize={"24px"}>
                            Upload cover
                        </Typography>
                    </Stack>
                    <Box
                        position={"relative"}
                        padding={"6px"}
                        borderRadius={"4px"}
                        borderTop={"1px solid rgba(22, 24, 35, 0.12)"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        height={"492px"}
                    >
                        <CropperBox src={src}/>
                        <Box
                            position={"relative"}
                            width={"384px"}
                            height={"64px"}
                            sx={{ userSelect: "none" }}
                        >
                            {src && (
                                <Stack direction={"row"}>
                                    {listThumbnails.length > 0 &&
                                        listThumbnails.map((thumb, index) => (
                                            <Box
                                                key={index}
                                                width={"84px"}
                                                height={"64px"}
                                                overflow={"hidden"}
                                                bgcolor={
                                                    "linear-gradient(270deg, rgba(31, 35, 41, 0.08) -0.13%, rgba(31, 35, 41, 0.02) 100%)"
                                                }
                                            >
                                                {console.log(thumb)}
                                                <Image
                                                    width={"100%"}
                                                    height={"100%"}
                                                    src={thumb}
                                                    alt="thumbnail"
                                                    layer={true}
                                                />
                                            </Box>
                                        ))}
                                </Stack>
                            )}
                            <Box
                                position={"absolute"}
                                top={0}
                                left={0}
                                overflow={"hidden"}
                                borderRadius={"4px"}
                                sx={{ cursor: "grab" }}
                                display={"flex"}
                            >
                                <canvas height={"64"} width={"384"} />
                            </Box>
                            <Box
                                display={"block"}
                                position={"absolute"}
                                top={"-4px"}
                                width={"4px"}
                                height={"72px"}
                                borderRadius={"4px"}
                                zIndex={1}
                                bgcolor={"rgb(32, 213, 236)"}
                                sx={{ cursor: "grab" }}
                            ></Box>
                        </Box>
                        {/* <Box
                            display={"block"}
                            position={"absolute"}
                            top={0}
                            left={0}
                            width={"100%"}
                            height={"100%"}
                        >
                             <Box position={"relative"} height={"100%"}>
                                <Slider
                                    onChange={handleChangeValue}
                                    value={changeValue}
                                    defaultValue={50}
                                    aria-label="Default"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={maxValue.toFixed(0)}
                                    step={0.5}
                                    sx={{
                                        appearance: "none",
                                        bgcolor: "transparent",
                                        top: "0",
                                        left: "0",
                                        width: "100%",
                                        height: "100%",
                                        cursor: "grab",
                                        "::-webkit-slider-thumb": {
                                            appearance: "none",
                                            width: "15px",
                                            height: "15px",
                                            bgcolor: "transparent",
                                        },
                                    }}
                                />
                            </Box> 
                        </Box> */}
                    </Box>
                    <video
                        style={{ display: "none" }}
                        ref={videoFormRef}
                        src={src}
                    />
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        height={"84px"}
                        padding={"24px"}
                        bgcolor={"#fff"}
                        borderTop={"1px solid rgba(22, 24, 35, 0.2)"}
                        gap={"16px"}
                    >
                        <Button primary={true}>Confirm</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}
