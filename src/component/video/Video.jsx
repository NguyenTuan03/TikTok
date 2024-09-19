import { useEffect, useMemo, useRef } from "react";

/* eslint-disable react/prop-types */
export default function Video({
    video,
    isLandscape,
    videoRef,
    handleTimeUpdate,
}) {
    const videoElement = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoElement.current.play();
                    } else {
                        videoElement.current.pause();
                    }
                });
            },
            { threshold: 0.7 } 
        );
        const currentVideoElement = videoElement.current;
        if (currentVideoElement) {
            observer.observe(currentVideoElement);
        }
        return () => {
            if (currentVideoElement) {
                observer.unobserve(currentVideoElement);
            }
        };
    }, []);
    const videoStyle = useMemo(
        () => ({
            width: "100%",
            height: "100%",
            display: "block",
            backgroundPosition: "center",
            borderRadius: "16px",
            objectFit: isLandscape ? "cover" : "cover",
        }),
        [isLandscape]
    );
    return (
        <>
            <video
                autoPlay
                loop
                // muted
                poster={video.thumb_url}
                style={videoStyle}
                ref={(e) => {
                    videoElement.current = e;
                    videoRef.current[video.id] = e
                }}
                onTimeUpdate={() => handleTimeUpdate(video.id)}
            >
                <source src={video.file_url} />
            </video>
        </>
    );
}
