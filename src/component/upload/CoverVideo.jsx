/* eslint-disable react/prop-types */
import { Box, Modal, Slider, Stack, Typography } from "@mui/material";
import { InfoIcon } from "../icon/Icon";
import Image from "../image/Image";
import { useCallback, useEffect, useRef, useState } from "react";
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
    stateCropData,
    stateTimeThumbnail,
}) {
    const [setCaptureTimeLeakVideo] = stateTimeThumbnail;
    const [listThumbnails, setListThumbnails] = stateList;
    const [changeValue, setChangeValue] = useState(0);
    const [maxValue, setMaxValue] = stateValue;    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const canvasRef = useRef();
    const videoRef = useRef(null);

    const cropBoxRef = useRef(null);
    const cropCanvasRef = useRef(null);

    const [cropData, setCropData] = stateCropData;
    const [refsReady, setRefsReady] = useState(false);

    const videoRefCallback = useCallback((node) => {
        if (node) {
            videoRef.current = node;
        }
    }, []);

    const handleCapture = () => {
        let canvasWidth;
        let canvasHeight;
        canvasWidth = canvasRef.current.width = videoRef.current.videoWidth;
        canvasHeight = canvasRef.current.height = videoRef.current.videoHeight;

        canvasRef.current
            .getContext("2d")
            .drawImage(videoRef.current, 0, 0, canvasWidth, canvasHeight);

        const imageUrl = canvasRef.current.toDataURL("image/jpeg", 1.0);

        return imageUrl;
    };

    useEffect(() => {
        if (!refsReady) return;

        let timeOut;
        let timeInterval;
        const handleCaptureFps = () => {
            if (videoRef.current) {
                const duration = videoRef.current.duration;
                let numberThumbnails = parseFloat(duration / 8);
                const prevValue = numberThumbnails;
                videoRef.current.currentTime = 0;
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
                                videoRef.current.currentTime = numberThumbnails;
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
        if (!videoRef.current) {
            console.warn("videoRef is not initialized yet.");
            return;
        }
        videoRef.current.addEventListener("loadeddata", handleCaptureFps());

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener(
                    "loadeddata",
                    handleCaptureFps()
                );
            }
            clearInterval(timeInterval);
            clearTimeout(timeOut);
        };
    }, [refsReady, src]);

    useEffect(() => {
        if (open) {
            const checkRefs = setTimeout(() => {
                if (canvasRef.current && videoRef.current) {
                    setRefsReady(true);
                } else {
                    console.warn("Refs are still not ready.");
                }
            }, 100); // Adjust the timeout as needed to allow rendering
            return () => clearTimeout(checkRefs);
        }
    }, [open]);
    const handleChangeValue = (e) => {
        const current = Number(e.target.value);
        setChangeValue(current);
        setCaptureTimeLeakVideo(current)
        videoRef.current.currentTime = current;
    };
    const handleCrop = () => {              
        const canvas = cropCanvasRef.current;        
        
        const context = canvas.getContext("2d");
        
        context.drawImage(
            videoRef.current, 
            0,
            0,
            canvas.width,
            canvas.height
        );

        
        const cropBox = cropBoxRef.current.getBoundingClientRect();
        const videoContainer = canvas.getBoundingClientRect();

        const scaleX = canvas.width / videoContainer.width;
        const scaleY = canvas.height / videoContainer.height;

        
        const cropX = (cropBox.left - videoContainer.left) * scaleX;
        const cropY = (cropBox.top - videoContainer.top) * scaleY;
        const cropWidth = cropBox.width * scaleX;
        const cropHeight = cropBox.height * scaleY;

        
        const imageData = context.getImageData(
            cropX,
            cropY,
            cropWidth,
            cropHeight
        );

        
        const croppedCanvas = document.createElement("canvas");
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;

        
        croppedCanvas.getContext("2d").putImageData(imageData, 0, 0);

        
        setCropData(croppedCanvas.toDataURL("image/png"));

        
        setOpen(false);
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
                sx={{cursor: "pointer"}}
                onClick={handleOpen}
            >
                {cropData && (
                    <Box height={"100%"}>
                        <Image src={cropData} width={"100%"} height={"100%"} borderTopLeft={"4px"} borderTopRight={"4px"}/>
                    </Box>
                )}
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
                    sx={{
                        borderBottomRightRadius:"4px",
                        borderBottomLeftRadius:"4px",
                    }}
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
                        <CropperBox
                            src={src}
                            videoRef={videoRef}
                            changeValue={changeValue}
                            cropBoxRef={cropBoxRef}
                            cropCanvasRef={cropCanvasRef}
                        />
                        <Box
                            position={"relative"}
                            width={"384px"}
                            height={"64px"}
                            marginTop={"40px"}
                            sx={{ userSelect: "none" }}
                        >
                            {src && (
                                <Stack
                                    direction={"row"}
                                    sx={{
                                        overflowX: "auto",
                                        scrollSnapType: "x mandatory",
                                        "&::-webkit-scrollbar": {
                                            height: "6px",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            background: "rgba(0,0,0,0.5)",
                                            borderRadius: "3px",
                                        },
                                    }}
                                >
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
                                                sx={{
                                                    scrollSnapAlign: "start",
                                                }}
                                            >
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
                                width={"100%"}
                                height={"100%"}
                                overflow={"hidden"}
                                borderRadius={"4px"}
                                sx={{ cursor: "grab" }}
                                display={"flex"}
                            >
                                <canvas
                                    width={"100%"}
                                    height={"100%"}
                                    ref={canvasRef}
                                />
                            </Box>
                            <Box
                                display={"block"}
                                position={"absolute"}
                                top={0}
                                left={0}
                                width={"100%"}
                                height={"100%"}
                            >
                                <Box position={"relative"} height={"100%"}>
                                    <Slider
                                        value={changeValue}
                                        onChange={(e) => handleChangeValue(e)}
                                        aria-label="Default"
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={Math.round(maxValue)}
                                        step={0.5}
                                        sx={{
                                            appearance: "none",
                                            bgcolor: "transparent",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            padding: "0",
                                            cursor: "grab",
                                            "& .MuiSlider-rail": {
                                                backgroundColor:
                                                    "transparent !important",
                                            },
                                            "& .MuiSlider-track": {
                                                border: "none",
                                                borderRight:
                                                    "4px solid rgb(32, 213, 236) !important",
                                                backgroundColor:
                                                    "transparent !important",
                                                borderRadius: "0",
                                                height: "120p%",
                                            },
                                            "& .MuiSlider-thumb": {
                                                width: "0",
                                                height: "0",
                                                bgcolor: "transparent",
                                            },
                                            "& .MuiSlider-valueLabelOpen": {
                                                display: "none",
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <video
                            ref={videoRefCallback}
                            src={src}
                            controls
                            style={{
                                width: "576px",
                                height: "100px",
                                marginTop: "10px",
                                display: "none",
                            }}
                        />
                    </Box>
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
                        <Button onClick={handleCrop} primary={true}>
                            Confirm
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}
