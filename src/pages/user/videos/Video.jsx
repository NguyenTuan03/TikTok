/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
export default function Video({ videos }) {
    return (
        <>
            <h1>Videos</h1>
            <Grid container spacing={2} width={"100%"} mt={2}>
                {videos?.map((video) => {
                    console.log(video);
                    return (
                        <>
                            <Grid item xs={12} sm={6} lg={3}>
                                <Box
                                    position={"relative"}
                                    display={"flex"}
                                    overflow={"hidden"}
                                    width={"300px"}
                                    height={"395px"}
                                >
                                    <video
                                        style={{
                                            position: "absolute",
                                            display: "flex",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "4px",
                                            objectFit: "cover",
                                        }}
                                        loop
                                        preload="true"
                                        poster={video.thumb_url}
                                        src={video.file_url}
                                    />
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        position={"absolute"}
                                        bottom={0}
                                        left={0}
                                        width={"100%"}
                                        height={"100px"}
                                        p={"67px 13px 17px"}
                                        sx={{background:"linear-gradient(rgba(22, 24, 35, 0) 2.92%, rgba(22, 24, 35, 0.5) 98.99%)"}}
                                    >
                                        <IoPlayOutline fontSize={"22px"} color="#fff"/>
                                        <Typography component={"span"} fontSize={"20px"} color={"#fff"} ml={1}>{video.views_count}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </>
                    );
                })}
            </Grid>
        </>
    );
}
