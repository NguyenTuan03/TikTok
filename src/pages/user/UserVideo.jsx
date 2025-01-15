/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import FooterVideo from "./FooterVideo";

export default function UserVideo({ videos }) {
    const [playIndex, setPlayIndex] = useState(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const videoRef = useRef([]);
    const handleVideoPlay = (index) => {
        videoRef.current.forEach((item, i) => {
            if (index === i) {
                setPlayIndex(index);
                console.log("set again");
                item.play();
            } else {
                item.pause();
            }
        });
    };
    const handleStop = (index) => {
        videoRef.current[index].pause();
        setPlayIndex(null);
        setIsInteracting(true);
        setTimeout(() => setIsInteracting(false), 500);
    };
    const handlePlay = (index) => {
        videoRef.current[index].play();
        setPlayIndex(index);
        setIsInteracting(true);
        setTimeout(() => setIsInteracting(false), 500);
    };
    const handleMouseEnter = (index) => {
        if (!isInteracting && playIndex !== index) {
            handleVideoPlay(index);
        }
    };

    return (
        <>
            <Grid container spacing={2} width={"100%"} mt={2}>
                {videos.map((video, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Grid item xs={12} sm={6} lg={3}>
                                <Box
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    position={"relative"}
                                    display={"flex"}
                                    overflow={"hidden"}
                                    width={"100%"}
                                    height={"395px"}
                                >
                                    <video
                                        ref={(ref) =>
                                            (videoRef.current[index] = ref)
                                        }
                                        style={{
                                            position: "absolute",
                                            display: "flex",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "8px",
                                            objectFit: "cover",
                                        }}
                                        muted={isMute}
                                        loop
                                        preload="true"
                                        poster={video.thumb_url}
                                        src={video.file_url}
                                    />
                                    <FooterVideo
                                        video={video}
                                        videoEle={videoRef.current[index]}
                                        handleMouseEnter={handleMouseEnter}
                                        handleStop={handleStop}
                                        handlePlay={handlePlay}
                                        playIndex={playIndex}
                                        index={index}
                                        mute={isMute}
                                        setMute={setIsMute}
                                    />
                                </Box>
                            </Grid>
                        </React.Fragment>
                    );
                })}
            </Grid>
        </>
    );
}
