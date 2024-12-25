/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Slider from "./../../../node_modules/react-input-slider/dist/index.esm";
import { Box } from "@mui/material";
export default function InputSlider({
    borderRadius = "8px",
    width = "100%",
    height = "100%",
    widthX = "100%",
    heightX = "4px",
    heightY = "150px",
    widthY = "4px",
    heightOver = "6px",
    bgThumb = "rgba(255, 255, 255)",
    widthThumb = "12px",
    heightThumb = "12px",
    bgBar = "rgba(255, 255, 255, 0.4)",
    bgProgress = "rgba(254, 44, 85, 1)",
    onChange = () => {},
    onSeekStart = () => {},
    onSeekEnd = () => {},
    min = 0,
    max,
    bgWrapper,
    value,
    step = 0.0001,
    isVertical = false,
    flex
}) {
    const [state, setState] = useState({ x: min, y: min });
    const [isOver, setIsOver] = useState(false);
    useEffect(() => {
        setState({
            x: value,
            y: value,
        });
    }, [value]);
    return (
        <Box
            component={"div"}
            sx={{
                flex:flex,
                width: width,
                height: height,
                backgroundColor: bgWrapper,
                position: "relative",
                display: "flex",
                alignItems: "center",
                // transition: "all 0.3s linear"
            }}
            onMouseEnter={() => setIsOver(true)}
            onMouseLeave={() => setIsOver(false)}
            aria-label="Tiến độ"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
        >
            {isVertical ? (
                <Slider
                    styles={{
                        track: {
                            borderRadius: borderRadius,
                            width: widthY,
                            height: heightY,
                            backgroundColor: bgBar,
                            cursor: "pointer",
                            transition: "all 0.3s linear"
                        },
                        active: {
                            borderRadius: borderRadius,
                            backgroundColor: bgProgress,
                            cursor: "pointer",
                            transition: "all 0.3s linear"
                        },
                        thumb: {
                            background: bgThumb,
                            width: widthThumb,
                            height: heightThumb,
                            cursor: "pointer",
                            transition: "all 0.3s linear"
                        },
                        disabled: {
                            opacity: 0.5,
                            transition: "all 0.3s linear"
                        },
                    }}
                    axis="y"
                    yreverse
                    y={state.y}
                    ymin={min}
                    ymax={max}
                    ystep={step}
                    onChange={({ y }) => {
                        onChange(y);
                        setState((state) => ({ ...state, y }));
                    }}
                />
            ) : (
                <Slider
                    styles={{
                        track: {
                            borderRadius: borderRadius,
                            width: widthX,
                            height: isOver ? heightOver : heightX,
                            backgroundColor: bgBar,
                            cursor: "pointer",
                            // transition: "all 0.3s linear"
                        },
                        active: {
                            borderRadius: borderRadius,
                            backgroundColor: bgProgress,
                            cursor: "pointer",
                            // transition: "all 0.3s linear"
                        },
                        thumb: {
                            opacity: isOver ? "1" : "0",
                            background: bgThumb,
                            width: widthThumb,
                            height: heightThumb,
                            cursor: "pointer",
                            // transition: "all 0.3s linear"
                        },
                        disabled: {
                            opacity: 0.5,
                            transition: "all 0.3s linear"
                        },
                    }}
                    axis="x"
                    x={state.x}
                    xmin={min}
                    xmax={max}
                    xstep={step}
                    onDragStart={onSeekStart}
                    onDragEnd={onSeekEnd}
                    onChange={({ x }) => {
                        onChange(x);
                        setState((state) => ({ ...state, x }));
                    }}
                />
            )}
        </Box>
    );
}
