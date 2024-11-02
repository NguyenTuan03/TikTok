/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import { EllipsisHorizon } from "../../icon/Icon";
import { HEADER_VIDEO } from "../../../const/HEADER_VIDEO";
import Menu from "../../popper/menu/Menu";
import VolumeVideo from "../../volume/VolumeVideo";
export default function HeaderVideo({
    videoRef,
    isShowTrack,
    setIsShowTrack,
    mute,
    setMute,
    handleMuteVideo,
    valueVolume,
    setValueVolume,
}) {
    const handleChangeValueVolume = (e) => {
        const sliderValue = Number(e.target.value);
        setValueVolume(sliderValue);
        videoRef.current.volume = sliderValue;
        if (sliderValue === 0) {
            setMute(true);
        } else {
            setMute(false);
        }
    };
    return (
        <Stack
            className="header_video"
            display={"none"}
            width={"100%"}
            spacing={1}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            position={"absolute"}
            top={"5px"}
            padding={"0 10px"}
        >
            <VolumeVideo
                mute={mute}
                isShowTrack={isShowTrack}
                onClick={handleMuteVideo}
                onChange={handleChangeValueVolume}
                valueVolume={valueVolume}
                setTrack={setIsShowTrack}
                isVertical={false}
            />
            <Box display={"block"}>
                <Menu
                    items={HEADER_VIDEO}
                    width={"200px"}
                    height={"150px"}
                    placement="right-end"
                >
                    <Box>
                        <EllipsisHorizon />
                    </Box>
                </Menu>
            </Box>
        </Stack>
    );
}
