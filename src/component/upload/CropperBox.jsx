/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function CropperBox({ src }) {
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const cropBoxRef = useRef(null); // Reference to the cropping box
    const [cropData, setCropData] = useState(null);

    const [position, setPosition] = useState({ x: 50, y: 50 }); // Initial position
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset for dragging
    const [isVertical, setIsVertical] = useState(false); // Detect video orientation
    const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const video = videoRef.current;
        video.addEventListener("loadedmetadata", () => {
            setIsVertical(video.videoHeight > video.videoWidth);
            setVideoSize({
                width: video.offsetLeft,
                height: video.offsetTop,
              });
        });        
        
    }, [src]);    
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

        const canvasRect = canvasRef.current.getBoundingClientRect();
        let newX = e.clientX - canvasRect.left - offset.x;
        let newY = e.clientY - canvasRect.top - offset.y;

        // Prevent the crop box from moving out of canvas boundaries
        newX = Math.max(0, Math.min(newX, canvasRect.width - 200));
        newY = Math.max(0, Math.min(newY, canvasRect.height - 200));

        setPosition({ x: newX, y: newY });
    };
    const handleMouseUp = () => {
        setDragging(false);
    };
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

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
    }, []);

    const handleCrop = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Define crop box position and size dynamically
        const cropBox = cropBoxRef.current.getBoundingClientRect();
        const videoContainer = canvas.getBoundingClientRect();

        // Calculate crop area based on overlay position
        const cropX = cropBox.left - videoContainer.left;
        const cropY = cropBox.top - videoContainer.top;
        const cropWidth = cropBox.width;
        const cropHeight = cropBox.height;

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

        setCropData(croppedCanvas.toDataURL());
    };

    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 2 }}
        >
            {console.log(videoSize.width)}
            <Box
                width={`${videoSize.width}px`}
                height={"324px"}
                position="relative"
                overflow="hidden"
                border="none"
                borderRadius="8px"                
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <canvas
                    ref={canvasRef}                    
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "black",                        
                    }}
                />
                <Box
                    ref={cropBoxRef}
                    position="absolute"
                    top="0"
                    left="0"
                    width={isVertical ? "100%" : "243px"}
                    height={isVertical? "243px":"324px"}
                    border="2px solid rgb(16, 162, 197)"
                    borderRadius="8px"
                    pointerEvents="none"
                    sx={{
                        boxShadow: "rgba(255, 255, 255, 0.8) 0px 0px 0px 999px",
                        cursor: "move",
                        transform:isVertical ? `translate(0, ${position.y}px)` : `translate(${position.x}px, 0)`,
                    }}
                    onMouseDown={handleMouseDown}
                />
            </Box>
            <video
                ref={videoRef}
                src={src}
                controls
                style={{ width: "576px", height: "100px", marginTop: "10px" }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleCrop}
                sx={{ mt: 2 }}
            >
                Crop Frame
            </Button>
            {cropData && (
                <Box mt={2}>
                    <h3>Cropped Image:</h3>
                    <img
                        src={cropData}
                        alt="Cropped Result"
                        style={{ borderRadius: "8px" }}
                    />
                </Box>
            )}
        </Stack>
    );
}
