import {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Videos } from "../context/VideoContext";
/* eslint-disable react/prop-types */
export default function Video({ video }) {
    const videoRef = useRef();
    const setRef = useCallback((node) => {
        if (node) {
            videoRef.current = node;
        }
    }, []);
    const [playVideo, setPlayVideo] = useState(false);
    const videoContext = useContext(Videos);
    useEffect(() => {
        videoContext.setVideoRef(videoRef);
    }, [setRef]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.play();
                        entry.target.currentTime = 0;
                    } else {
                        entry.target.pause();
                    }
                });
            },
            { threshold: 0.7 }
        );
        const currentVideoElement = videoRef.current;
        if (currentVideoElement) {
            observer.observe(currentVideoElement);
        }
        return () => {
            if (currentVideoElement) {
                observer.unobserve(currentVideoElement);
            }
        };
    }, [videoRef]);
    const videoStyle = {
        width: "100%",
        height: "100%",
        display: "block",
        backgroundPosition: "center",
        borderRadius: "16px",
        objectFit: "cover",
    };

    const handlePlayVideo = () => {
        setPlayVideo((prev) => !prev);
        !playVideo ? videoRef.current.play() : videoRef.current.pause();
    };
    return (
        <>
            
            <video
                onClick={() => handlePlayVideo()}
                autoPlay={true}
                loop
                // muted
                poster={video.thumb_url}
                style={videoStyle}
                ref={setRef}
                preload="auto"
                // onTimeUpdate={() => handleTimeUpdate(video.id)}
            >
                <source src={video.file_url} />
            </video>
        </>
    );
}
