/* eslint-disable react/prop-types */
import { Slider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function VideoTrack({ videoEle, playIndex }) {
    const [progress, setProgress] = useState(0);
    const updateProgress = () => {
        const percentage = (videoEle.currentTime / videoEle.duration) * 100;
        setProgress(percentage);
        
    }
    const handleProgressChange = useCallback(
        (e) => {
            const videoElement = videoEle;
            if (videoElement && videoElement.duration) {
                const duration = videoElement.duration;
                const newTime = (e.target.value / 100) * duration;
                videoElement.currentTime = newTime;
                setProgress(e.target.value);
            }
        },
        [videoEle]
    );

    useEffect(() => {
        const currentVideo = videoEle
        if (currentVideo) {
            updateProgress();
            currentVideo.addEventListener("timeupdate",updateProgress);
        }
        return () => {
            if (currentVideo) {
                currentVideo.removeEventListener("timeupdate",updateProgress);
            }
        };
    },[playIndex]);

    return (
        <Slider
            value={progress || 0}
            onChange={(e) => handleProgressChange(e)}
            min={0}
            max={100}
            step={1}
            sx={{
                position: "absolute",
                bottom: "0px",
                left: "0",
                padding: "0",
                width: "100%",
                transition:"all 0.2s linear",
                "& .MuiSlider-thumb": {
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#fff",
                },
                "& .MuiSlider-rail": {
                    backgroundColor: "rgb(126 120 119)",
                },
                "& .MuiSlider-track": {
                    backgroundColor: "rgb(254 44 85)",
                    border: "none",
                },
            }}
        />
    );
}
