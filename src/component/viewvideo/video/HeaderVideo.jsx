/* eslint-disable react/prop-types */
import { Box, Slider, Stack } from "@mui/material";
import { EllipsisHorizon, VolumeMute, VolumeUp } from "../../icon/Icon";
import { HEADER_SLIDER } from "../../../const/HEADER_SLIDER";
import { HEADER_VIDEO } from "../../../const/HEADER_VIDEO";
import Menu from "../../popper/menu/Menu";
export default function HeaderVideo({videoRef, isShowTrack, setIsShowTrack, mute,setMute, handleMuteVideo, valueVolume, setValueVolume }) {        
    const handleChangeValueVolume = (e) => {
        const sliderValue = Number(e.target.value);
        setValueVolume(sliderValue)
        videoRef.current.volume = sliderValue;        
        if (sliderValue ===0) {
            setMute(true);
        } else {
            setMute(false);
        }
    }
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
            <Stack
                display={"flex"}
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                onMouseEnter={() => setIsShowTrack(true)}
                onMouseLeave={() => setIsShowTrack(false)}
            >
                <Box onClick={handleMuteVideo}>
                    {!mute ? (
                        <>
                            <VolumeUp
                                width="24px"
                                height="24px"
                                cursor={"pointer"}
                            />
                        </>
                    ) : (
                        <>
                            <VolumeMute cursor={"pointer"} />
                        </>
                    )}
                </Box>

                <Box
                    width={"64px"}
                    height={"24px"}
                    bgcolor={"#16182357"}
                    textAlign={"center"}
                    borderRadius={"24px"}
                    position={"relative"}
                    marginLeft={"6px !important"}
                    display={isShowTrack ? "block" : "none"}
                >
                    <Slider
                        aria-label="Volume"
                        min={0}
                        max={1}
                        step={0.001}
                        sx={HEADER_SLIDER}
                        value={valueVolume}
                        onChange={e => handleChangeValueVolume(e)}
                        
                        style={{
                            transition: "opacity 0.5s ease, transform 0.5s ease",  
                        }}
                    />
                </Box>
            </Stack>
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
