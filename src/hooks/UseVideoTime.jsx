import { useEffect, useState } from 'react'

export default function UseVideoTime(currentTime) {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    useEffect(() => {
        const totalSeconds = Math.floor(currentTime)
        const seconds = totalSeconds % 60 < 10 ? '0' + (totalSeconds % 60) : totalSeconds % 60;
        const minutes = totalSeconds / 60 < 10 ? '0' + Math.floor(totalSeconds / 60) : Math.floor(totalSeconds / 60)
        setSeconds(seconds)
        setMinutes(minutes)
    },[currentTime])
  return {seconds, minutes}
}
