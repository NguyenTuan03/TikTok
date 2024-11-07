/* eslint-disable react/prop-types */
import { Box, Slider, Stack } from "@mui/material";
import { VolumeMute, VolumeUp } from "../icon/Icon";
import { HEADER_SLIDER } from "../../const/HEADER_SLIDER";
import { SLIDER_VERTICAL } from './../../const/SLIDER_VERTICAL';
export default function VolumeVideo({
    mute,
    isShowTrack,
    onClick = () => {},
    onChange = () => {},
    valueVolume,
    setTrack,
    direction = "row",
    isVertical,
}) {
    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
        }
    }
    return (
        <Stack
            display={"flex"}
            direction={direction}
            alignItems={"center"}
            spacing={2}
            onMouseEnter={() => setTrack(true)}
            onMouseLeave={() => setTrack(false)}
        >
            {isVertical ? (
                <>
                    <Box onClick={onClick} width={"24px"} height={"24px"}>
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
                                <VolumeMute
                                    width="24px"
                                    height="24px"
                                    cursor={"pointer"}
                                />
                            </>
                        )}
                    </Box>
                    <Box
                        width={"30px"}
                        height={"110px"}
                        bgcolor={"rgba(84,84,84,0.5)"}
                        textAlign={"center"}
                        borderRadius={"24px"}
                        position={"relative"}
                        sx={{
                            opacity: isShowTrack ? 1 : 0,
                        }}
                    >
                        <Slider
                            aria-label="Volume"
                            min={0}
                            max={1}
                            step={0.001}
                            value={valueVolume}
                            onChange={e => onChange(e)}
                            sx={SLIDER_VERTICAL}
                            orientation="vertical"                            
                            onKeyDown={preventHorizontalKeyboardNavigation}
                        />
                    </Box>
                </>
            ) : (
                <>
                    <Box onClick={onClick}>
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
                            onChange={(e) => onChange(e)}
                            style={{
                                transition:
                                    "opacity 0.5s ease, transform 0.5s ease",
                            }}
                        />
                    </Box>
                </>
            )}
        </Stack>
    );
}
