/* eslint-disable react/prop-types */
import { Box, Slider, Stack } from "@mui/material";
import { VolumeMute, VolumeUp } from "../icon/Icon";
import { HEADER_SLIDER } from "../../const/HEADER_SLIDER";

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
                        width={"34px"}
                        height={"80px"}
                        bgcolor={"#16182357"}
                        textAlign={"center"}
                        borderRadius={"24px"}
                        position={"relative"}
                        display={isShowTrack ? "block" : "none"}
                    >
                        <Slider
                            aria-label="Volume"
                            orientation="vertical"
                            min={0}
                            max={1}
                            step={0.001}
                            sx={{
                                position: "absolute",
                                left: "2px",
                                top: "0",
                                height: "80px",
                                color: "rgba(0,0,0,0.87)",
                                background:"rgba(84, 84, 84, 0.5)",
                                "& .MuiSlider-rail": {
                                    backgroundColor: "#fff",
                                },
                                "& .MuiSlider-track": {
                                    border: "none",
                                    backgroundColor: "#fff",
                                },
                                "& .MuiSlider-thumb": {
                                    width: 16,
                                    height: 16,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    "&::before": {
                                        boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                                    },
                                    "&:hover, &.Mui-focusVisible, &.Mui-active":
                                        {
                                            boxShadow: "none",
                                        },
                                },
                            }}
                            value={valueVolume}
                            onChange={(e) => onChange(e)}
                            style={{
                                transition:
                                    "opacity 0.5s ease, transform 0.5s ease",
                            }}
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
                        onChange={e => onChange(e)}
                        
                        style={{
                            transition: "opacity 0.5s ease, transform 0.5s ease",  
                        }}
                    />
                </Box>
                </>
            )}
        </Stack>
    );
}
