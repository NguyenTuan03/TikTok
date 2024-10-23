/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const Videos = createContext();
export default function VideoContext({children}) {
    const [videoList, setVideoList] = useState([]);
    const [idVideo, setIdVideo] = useState();
    const [track, setTrack] = useState();
    const [audio, setAudio] = useState();
    const [progress, setProgress] = useState();
    const [volume, setVolume] = useState();
    const [isShowVolume, setIsShowVolume] = useState(false);
    const value = {
        videoList,
        setVideoList,
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
        setIsShowVolume
    }
  return (
    <Videos.Provider value={value}>
        {children}
    </Videos.Provider>
  )
}
