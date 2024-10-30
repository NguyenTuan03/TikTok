/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const Videos = createContext();
export default function VideoContext({children}) {
    const [listVideo, setListVideo] = useState([]);
    const [listVideoHome, setListVideoHome] = useState([]);

    const [idVideo, setIdVideo] = useState();
    const [track, setTrack] = useState();
    const [audio, setAudio] = useState();
    const [progress, setProgress] = useState();
    const [volume, setVolume] = useState();
    const [isShowVolume, setIsShowVolume] = useState(true);
    const [valueVolume, setValueVolume] = useState(0);
    const [videoRef, setVideoRef] = useState();
    const [timeValueVideo, setTimeValueVideo] = useState(0);
    const [mute, setMute] = useState(false);
    const [previousValue, setPreviousValue] = useState(100);
    const [positionVideo, setPositionVideo] = useState(null);
    
    const value = {
        listVideo,
        setListVideo,
        idVideo,
        setIdVideo,
        track,
        setTrack,
        audio,
        setAudio,
        progress,
        setProgress,
        volume,
        setVolume,
        isShowVolume,
        setIsShowVolume,
        videoRef,
        setVideoRef,
        timeValueVideo,
        setTimeValueVideo,
        listVideoHome,
        setListVideoHome,
        mute,
        setMute,
        valueVolume,
        setValueVolume,
        previousValue,
        setPreviousValue,
        positionVideo,
        setPositionVideo
    }
  return (
    <Videos.Provider value={value}>
        {children}
    </Videos.Provider>
  )
}
