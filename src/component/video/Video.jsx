import { useEffect, useRef } from "react";

/* eslint-disable react/prop-types */
export default function Video({video,videoList, isLandscape,videoRef,handleTimeUpdate }) {

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
        videoList.forEach((video) => {
            const videoElement = videoRef.current[video.id];
            if (videoElement) {
                observer.observe(videoElement);
            }
        });
        
        return () => {
            videoList.forEach((video) => {
                const videoElement = videoRef.current[video.id];
                if (videoElement) {
                    observer.unobserve(videoElement);
                }
            });
        };
    }, [videoList]);
    
    return (
        <>
            <video
                autoPlay
                loop
                muted
                poster={video.thumb_url}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    backgroundPosition: "center",
                    borderRadius: "16px",
                    objectFit: isLandscape ? "cover" : "cover",
                }}
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
