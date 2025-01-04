/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import { forwardRef, useCallback, useEffect, useState } from "react";

const CropperBox = forwardRef(({ src, videoRef, changeValue, cropBoxRef, cropCanvasRef }, ref) => {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isVertical, setIsVertical] = useState(false);
    const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
    const cropBoxRefCallback = useCallback((node) => {
        if (node) {
            cropBoxRef.current = node;
        }
    }, []);
    useEffect(() => {
        const video = videoRef.current;
        const canvas = cropCanvasRef.current;
        try {
            video.addEventListener("loadedmetadata", () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                setIsVertical(video.videoHeight > video.videoWidth);
                setVideoSize({
                    width: video.videoWidth > 1000 ? 576 : 180,
                    height: 324,
                });
            });
        } catch (error) {
            console.log(error);
        }
    }, [src]);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = cropCanvasRef.current;
        const context = canvas.getContext("2d");

        if (!video || !canvas) return;

        video.currentTime = changeValue;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }, [changeValue]);

    const handleMouseDown = (e) => {
        setDragging(true);
        const cropBox = cropBoxRef.current.getBoundingClientRect();
        setOffset({
            x: e.clientX - cropBox.left,
            y: e.clientY - cropBox.top,
        });
    };
    const handleMouseMove = (e) => {
        if (!dragging) return;

        const canvasRect = cropCanvasRef.current.getBoundingClientRect();
        let newX = e.clientX - canvasRect.left - offset.x;
        let newY = e.clientY - canvasRect.top - offset.y;

        newX = Math.max(0, Math.min(newX, canvasRect.width - 200));
        newY = Math.max(0, Math.min(newY, canvasRect.height - 200));

        setPosition({ x: newX, y: newY });
    };
    const handleMouseUp = () => {
        setDragging(false);
    };
    useEffect(() => {
        const video = videoRef.current;
        const canvas = cropCanvasRef.current;
        const context = canvas.getContext("2d");
        try {
            const captureFrame = () => {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
            };

            video.addEventListener("play", () => {
                const interval = setInterval(() => {
                    if (!video.paused && !video.ended) {
                        captureFrame();
                    }
                }, 100);
                return () => clearInterval(interval);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 2 }}
            ref={ref}
        >
            <Box
                width={`${videoSize.width}px`}
                height={`${videoSize.height}px`}
                position="relative"
                overflow="hidden"
                border="none"
                borderRadius="8px"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <canvas
                    ref={cropCanvasRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "black",
                    }}
                />
                <Box
                    ref={cropBoxRefCallback}
                    position="absolute"
                    top="0"
                    left="0"
                    width={isVertical ? "100%" : "243px"}
                    height={isVertical ? "243px" : "324px"}
                    border="2px solid rgb(16, 162, 197)"
                    borderRadius="8px"
                    pointerEvents="none"
                    sx={{
                        boxShadow: "rgba(255, 255, 255, 0.8) 0px 0px 0px 999px",
                        cursor: "move",
                        transform: isVertical
                            ? `translate(0, ${position.y}px)`
                            : `translate(${position.x}px, 0)`,
                    }}
                    onMouseDown={handleMouseDown}
                />
            </Box>
        </Stack>
    );
})
export default CropperBox;