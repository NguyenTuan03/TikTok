import { Box, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { UploadIcon } from "../../component/icon/Icon";
import Button from "./../../component/button/Button";
import Image from "./../../component/image/Image";
import FormMainUpload from "./../../component/upload/FormMainUpload";

export default function Upload() {
    const SUGGESTION_ITEMS = [
        {
            name: "Size and duration",
            description: "Maximum size: 10 GB, video duration: 60 minutes.",
            img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTggOS42MDQ4OUwyMi41OTE1IDYuNDYzNDVDMjMuMTg4OSA2LjA1NDc2IDIzLjk5OTggNi40ODI0OCAyMy45OTk4IDcuMjA2MjNWMTYuNzkzNkMyMy45OTk4IDE3LjUxNzQgMjMuMTg4OSAxNy45NDUxIDIyLjU5MTUgMTcuNTM2NEwxOC4wMDAyIDE0LjM5NUwxOC4wMDAxIDEyLjAwMDNMMjEuOTk5NSAxNC43MDg1VjkuMjkxOTlMMTguMDAwMSAxMi4wMDAzTDE4IDkuNjA0ODlaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjMyIi8+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xIDYuNUMxIDQuODQzMTUgMi4zNDMxNSAzLjUgNCAzLjVIMTVDMTYuNjU2OSAzLjUgMTggNC44NDMxNSAxOCA2LjVWMTcuNUMxOCAxOS4xNTY5IDE2LjY1NjkgMjAuNSAxNSAyMC41SDRDMi4zNDMxNSAyMC41IDEgMTkuMTU2OSAxIDE3LjVWNi41Wk00IDUuNUgxNUMxNS41NTIzIDUuNSAxNiA1Ljk0NzcyIDE2IDYuNVYxNy41QzE2IDE4LjA1MjMgMTUuNTUyMyAxOC41IDE1IDE4LjVINEMzLjQ0NzcyIDE4LjUgMyAxOC4wNTIzIDMgMTcuNVY2LjVDMyA1Ljk0NzcyIDMuNDQ3NzIgNS41IDQgNS41WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgo8L3N2Zz4K",
        },
        {
            name: "File formats",
            description:
                "Recommended: “.mp4”. Other major formats are supported.",
            img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik02IDRDNS43MjM4NiA0IDUuNSA0LjIyMzg2IDUuNSA0LjVWMTkuNUM1LjUgMTkuNzc2MSA1LjcyMzg2IDIwIDYgMjBIMTlDMTkuMjc2MSAyMCAxOS41IDE5Ljc3NjEgMTkuNSAxOS41VjEwSDE0QzEzLjQ0NzcgMTAgMTMgOS41NTIyOCAxMyA5VjRINlpNMTUgNS4yODM5OFY4SDE3Ljk0MjNMMTUgNS4yODM5OFpNMy41IDQuNUMzLjUgMy4xMTkyOSA0LjYxOTI5IDIgNiAySDE0QzE0LjI1MTQgMiAxNC40OTM2IDIuMDk0NjggMTQuNjc4MyAyLjI2NTJMMjEuMTc4MyA4LjI2NTJDMjEuMzgzNCA4LjQ1NDUgMjEuNSA4LjcyMDkgMjEuNSA5VjE5LjVDMjEuNSAyMC44ODA3IDIwLjM4MDcgMjIgMTkgMjJINkM0LjYxOTI5IDIyIDMuNSAyMC44ODA3IDMuNSAxOS41VjQuNVoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMzIiLz4KICA8cGF0aCBkPSJNMTQuNzgyNiAxMy40NDM2QzE1LjA3MjUgMTMuNjExIDE1LjA3MjUgMTQuMDI5MyAxNC43ODI2IDE0LjE5NjdMMTAuNjUyMiAxNi41ODE0QzEwLjM2MjMgMTYuNzQ4NyAxMCAxNi41Mzk1IDEwIDE2LjIwNDhWMTEuNDM1NEMxMCAxMS4xMDA3IDEwLjM2MjMgMTAuODkxNiAxMC42NTIyIDExLjA1ODlMMTQuNzgyNiAxMy40NDM2WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgo8L3N2Zz4K",
        },
        {
            name: "Video resolutions",
            description: "Minimum resolution: 720p. 2K and 4K are supported.",
            img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik00IDJDMi42MTkyOSAyIDEuNSAzLjExOTI5IDEuNSA0LjVWMTkuNUMxLjUgMjAuODgwNyAyLjYxOTI5IDIyIDQgMjJIMjFDMjIuMzgwNyAyMiAyMy41IDIwLjg4MDcgMjMuNSAxOS41VjQuNUMyMy41IDMuMTE5MjkgMjIuMzgwNyAyIDIxIDJINFpNMy41IDQuNUMzLjUgNC4yMjM4NiAzLjcyMzg2IDQgNCA0SDIxQzIxLjI3NjEgNCAyMS41IDQuMjIzODYgMjEuNSA0LjVWMTkuNUMyMS41IDE5Ljc3NjEgMjEuMjc2MSAyMCAyMSAyMEg0QzMuNzIzODYgMjAgMy41IDE5Ljc3NjEgMy41IDE5LjVWNC41WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgogIDxwYXRoIGQ9Ik02LjcwMDk0IDE1LjA5NzdDNi4yMjQzNyAxNS4wOTc3IDUuOTQzMTIgMTQuNzkzIDUuOTQzMTIgMTQuNDI1OEM1Ljk0MzEyIDE0LjIyNjYgNS45OSAxNC4wNzQyIDYuMDgzNzUgMTMuOTA2Mkw3Ljg4ODQ0IDEwLjY0NDVWMTAuNjEzM0g1Ljc3MTI1QzUuMzk2MjUgMTAuNjEzMyA1LjEyNjcyIDEwLjM1OTQgNS4xMjY3MiA5Ljk4NDM4QzUuMTI2NzIgOS42MDkzOCA1LjM5NjI1IDkuMzYzMjggNS43NzEyNSA5LjM2MzI4SDguNTc1OTRDOS4xMTEwOSA5LjM2MzI4IDkuNTM2ODcgOS42OTUzMSA5LjUzNjg3IDEwLjIzMDVDOS41MzY4NyAxMC41MTk1IDkuNDQ3MDMgMTAuNzg1MiA5LjI0MzkxIDExLjE3MTlMNy40MzkyMiAxNC42MDk0QzcuMjUxNzIgMTQuOTY4OCA3LjA1NjQxIDE1LjA5NzcgNi43MDA5NCAxNS4wOTc3Wk0xMC42NDA2IDE1QzEwLjEwMTYgMTUgOS44NjcxOSAxNC42OTkyIDkuODY3MTkgMTQuMjg1MkM5Ljg2NzE5IDEzLjk4MDUgMTAuMDA3OCAxMy43NDYxIDEwLjMyMDMgMTMuNDg0NEwxMS44NzExIDEyLjE1NjJDMTIuNTAzOSAxMS42MTMzIDEyLjY4MzYgMTEuMzY3MiAxMi42ODM2IDExLjAzMTJDMTIuNjgzNiAxMC42NzU4IDEyLjQxMDIgMTAuNDI5NyAxMi4wMDc4IDEwLjQyOTdDMTEuNzEwOSAxMC40Mjk3IDExLjUwNzggMTAuNTY2NCAxMS4yOTY5IDEwLjg3MTFDMTEuMDc4MSAxMS4xOTE0IDEwLjg3ODkgMTEuMzA4NiAxMC41NjI1IDExLjMwODZDMTAuMTQwNiAxMS4zMDg2IDkuODgyODEgMTEuMDYyNSA5Ljg4MjgxIDEwLjY2NDFDOS44ODI4MSAxMC41MzUyIDkuOTA2MjUgMTAuNDE0MSA5Ljk1NzAzIDEwLjI5NjlDMTAuMjUzOSA5LjYyNSAxMS4wNDY5IDkuMjA3MDMgMTIuMDMxMiA5LjIwNzAzQzEzLjQwMjMgOS4yMDcwMyAxNC4yNzczIDkuODk4NDQgMTQuMjc3MyAxMC45MjE5QzE0LjI3NzMgMTEuNjc5NyAxMy44ODY3IDEyLjA3NDIgMTMuMDExNyAxMi44MzJMMTEuOTg0NCAxMy43MTg4VjEzLjc1SDEzLjc3MzRDMTQuMTg3NSAxMy43NSAxNC40MjE5IDEzLjk5NjEgMTQuNDIxOSAxNC4zNzVDMTQuNDIxOSAxNC43NDYxIDE0LjE4NzUgMTUgMTMuNzczNCAxNUgxMC42NDA2Wk0xNy4xOTM2IDE1LjE1NjJDMTUuNjQ2NyAxNS4xNTYyIDE0LjY3MDIgMTQuMDMxMiAxNC42NzAyIDEyLjE2OEMxNC42NzAyIDEwLjI5MyAxNS42NTg0IDkuMjAzMTIgMTcuMTkzNiA5LjIwMzEyQzE4LjcyODggOS4yMDMxMiAxOS43MTMxIDEwLjI4OTEgMTkuNzEzMSAxMi4xNjQxQzE5LjcxMzEgMTQuMDIzNCAxOC43NDA1IDE1LjE1NjIgMTcuMTkzNiAxNS4xNTYyWk0xNy4xOTM2IDEzLjg4MjhDMTcuNzAxNCAxMy44ODI4IDE4LjAyNTYgMTMuMzQ3NyAxOC4wMjU2IDEyLjE2OEMxOC4wMjU2IDEwLjk4NDQgMTcuNzAxNCAxMC40NzY2IDE3LjE5MzYgMTAuNDc2NkMxNi42ODU4IDEwLjQ3NjYgMTYuMzU3NyAxMC45ODQ0IDE2LjM1NzcgMTIuMTY4QzE2LjM1NzcgMTMuMzQ3NyAxNi42ODU4IDEzLjg4MjggMTcuMTkzNiAxMy44ODI4WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgo8L3N2Zz4K",
        },
        {
            name: "Aspect ratios",
            description: "Recommended: 16:9 for landscape, 9:16 for vertical.",
            img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguNSA3LjVMMTcgNy41TDE3IDE2SDguNVY3LjVaTTYuNSA3LjVMNi40OTk5OSAxNi4yMjMxQzYuNDk5OTUgMTYuMzQyMyA2LjQ5OTg5IDE2LjQ4NDUgNi41MTAxMyAxNi42MDk4QzYuNTIyIDE2Ljc1NSA2LjU1MjQ0IDE2Ljk2MyA2LjY2MzQ5IDE3LjE4MUM2LjgwNzMgMTcuNDYzMiA3LjAzNjc3IDE3LjY5MjcgNy4zMTkwMSAxNy44MzY1QzcuNTM2OTYgMTcuOTQ3NiA3Ljc0NDk1IDE3Ljk3OCA3Ljg5MDE3IDE3Ljk4OTlDOC4wMTU0NSAxOC4wMDAxIDguMTU3NjUgMTguMDAwMSA4LjI3Njc1IDE4TDE3IDE4VjIxLjJDMTcgMjEuNDggMTcgMjEuNjIgMTcuMDU0NSAyMS43MjdDMTcuMTAyNCAyMS44MjExIDE3LjE3ODkgMjEuODk3NiAxNy4yNzMgMjEuOTQ1NUMxNy4zOCAyMiAxNy41MiAyMiAxNy44IDIySDE4LjJDMTguNDggMjIgMTguNjIgMjIgMTguNzI3IDIxLjk0NTVDMTguODIxMSAyMS44OTc2IDE4Ljg5NzYgMjEuODIxMSAxOC45NDU1IDIxLjcyN0MxOSAyMS42MiAxOSAyMS40OCAxOSAyMS4yVjE4SDIxLjdDMjEuOTggMTggMjIuMTIgMTggMjIuMjI3IDE3Ljk0NTVDMjIuMzIxMSAxNy44OTc2IDIyLjM5NzYgMTcuODIxMSAyMi40NDU1IDE3LjcyN0MyMi41IDE3LjYyIDIyLjUgMTcuNDggMjIuNSAxNy4yVjE2LjhDMjIuNSAxNi41MiAyMi41IDE2LjM4IDIyLjQ0NTUgMTYuMjczQzIyLjM5NzYgMTYuMTc4OSAyMi4zMjExIDE2LjEwMjQgMjIuMjI3IDE2LjA1NDVDMjIuMTIgMTYgMjEuOTggMTYgMjEuNyAxNkgxOUwxOSA3LjI3Njg2QzE5LjAwMDEgNy4xNTc3NSAxOS4wMDAxIDcuMDE1NDggMTguOTg5OSA2Ljg5MDE3QzE4Ljk3OCA2Ljc0NDk1IDE4Ljk0NzYgNi41MzY5NiAxOC44MzY1IDYuMzE5MDFDMTguNjkyNyA2LjAzNjc3IDE4LjQ2MzIgNS44MDczIDE4LjE4MSA1LjY2MzQ5QzE3Ljk2MyA1LjU1MjQ0IDE3Ljc1NSA1LjUyMiAxNy42MDk4IDUuNTEwMTNDMTcuNDg0NiA1LjQ5OTkgMTcuMzQyMyA1LjQ5OTk1IDE3LjIyMzMgNS40OTk5OUw4LjUgNS41VjIuOEM4LjUgMi41MTk5NyA4LjUgMi4zNzk5NiA4LjQ0NTUgMi4yNzNDOC4zOTc1NyAyLjE3ODkyIDguMzIxMDggMi4xMDI0MyA4LjIyNjk5IDIuMDU0NUM4LjEyMDA0IDIgNy45ODAwMyAyIDcuNyAySDcuM0M3LjAxOTk3IDIgNi44Nzk5NiAyIDYuNzczIDIuMDU0NUM2LjY3ODkyIDIuMTAyNDMgNi42MDI0MyAyLjE3ODkyIDYuNTU0NSAyLjI3M0M2LjUgMi4zNzk5NiA2LjUgMi41MTk5NyA2LjUgMi44VjUuNUwzLjMgNS41QzMuMDE5OTcgNS41IDIuODc5OTYgNS41IDIuNzczIDUuNTU0NUMyLjY3ODkyIDUuNjAyNDMgMi42MDI0MyA1LjY3ODkyIDIuNTU0NSA1Ljc3M0MyLjUgNS44Nzk5NiAyLjUgNi4wMTk5NyAyLjUgNi4zVjYuN0MyLjUgNi45ODAwMyAyLjUgNy4xMjAwNCAyLjU1NDUgNy4yMjY5OUMyLjYwMjQzIDcuMzIxMDcgMi42Nzg5MiA3LjM5NzU2IDIuNzczIDcuNDQ1NUMyLjg3OTk2IDcuNSAzLjAxOTk3IDcuNSAzLjMgNy41TDYuNSA3LjVaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjMyIi8+Cjwvc3ZnPgo=",
        },
    ];
    const inputRef = useRef(null);

    const [videoFile, setVideoFile] = useState(null);
    const [isUrl, setIsUrl] = useState("");
    const [isSelectedVideo, setIsSelectedVideo] = useState(false);

    const createUrlVideo = (e) => {
        const target = e.target.files;
        const url = URL.createObjectURL(target[0]);
        setIsUrl(url);
        setVideoFile(target[0].name);
        setIsSelectedVideo(true);
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setVideoFile(file);
        }
    };
    const changeVideo = () => {
        setVideoFile(null);
        inputRef.current.value = null;
        inputRef.current.click();
    };
    return (
        <Box
            m={"0 auto"}
            width={"100%"}
            p={"48px 32px 272px 32px"}
            bgcolor={"#fff"}
            borderRadius={"8px"}
            boxShadow={"0 2px 8px rgba(0,0,0,0.06)"}
        >
            {isSelectedVideo ? (
                <FormMainUpload url={isUrl} nameFile={videoFile}/>
            ) : (
                <>
                    <Box
                        width={"100%"}
                        height={"500px"}
                        textAlign={"center"}
                        bgcolor={"#f8f8f8"}
                        padding={"20px"}
                        border={"1px dashed rgba(0, 0, 0, 0.15)"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={inputRef}
                            onChange={createUrlVideo}
                            type="file"
                            accept="video/*"
                            multiple
                            style={{ display: "none" }}
                        />
                        <Box>
                            <UploadIcon />
                            <Typography
                                fontSize={"24px"}
                                lineHeight={"30px"}
                                fontWeight={700}
                                color={"#000"}
                            >
                                Select video to upload
                            </Typography>
                            <Typography
                                fontSize={"16px"}
                                lineHeight={"30px"}
                                fontWeight={500}
                                color={"rgba(0, 0, 0, .65)"}
                            >
                                Or drag and drop it here
                            </Typography>
                            <Button
                                primary={true}
                                width={"200px"}
                                height={"40px"}
                                mt={"16px"}
                                onClick={() => inputRef.current.click()}
                            >
                                Upload Video
                            </Button>
                            {videoFile && (
                                <div>
                                    <h4>Uploaded Video:</h4>
                                    <p>{videoFile}</p>
                                    <button onClick={changeVideo}>
                                        Change Video
                                    </button>
                                </div>
                            )}
                        </Box>
                    </Box>
                    <Stack
                        width={"100%"}
                        direction={"row"}
                        padding={"24px 0 0"}
                        sx={{ cursor: "auto" }}
                    >
                        {SUGGESTION_ITEMS.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Stack
                                        direction={"row"}
                                        flex={"1 1 0%"}
                                        gap={1}
                                    >
                                        <Image
                                            src={item.img}
                                            width={"25px"}
                                            height={"24px"}
                                        />
                                        <Box>
                                            <Typography
                                                fontSize={"16px"}
                                                letterSpacing={"0.24px"}
                                            >
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                fontSize={"14px"}
                                                mt={"5px"}
                                                fontWeight={"400"}
                                                color={"rgba(0, 0, 0, 0.48)"}
                                            >
                                                {item.description}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </React.Fragment>
                            );
                        })}
                    </Stack>
                </>
            )}
        </Box>
    );
}
