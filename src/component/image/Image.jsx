import { useState } from "react";
import images from "./Images";

// eslint-disable-next-line react/prop-types
export default function Image({src, alt, fallback = images.noImage, width, height,borderRadius,cursor, ...props}) {
  const [_fallback, setFallBack] = useState('');
  const style = {
    width: `${width}`,
    height: `${height}`,
    borderRadius: borderRadius && "50%",
    cursor: cursor && "pointer"
  }  
  return (
    <img
      loading="lazy"
      style={style}
      src={_fallback || src}
      alt={alt}
      {...props}
      onError={() => {
          setFallBack(fallback)
      }}
    />
  )
}
