import { useState } from "react";
import images from "./Images";

// eslint-disable-next-line react/prop-types
export default function Image({src, alt,mr="0", fallback = images.noImage,onClick = () => {}, width, height,borderRadius,cursor,layer, ...props}) {
  const [_fallback, setFallBack] = useState('');
  const style = {
    display: 'block',
    width: `${width}`,
    height: `${height}`,
    borderRadius: borderRadius && "50%",
    cursor: cursor && "pointer",
    objectFit: 'cover',
    marginRight: `${mr}`,
    opacity: layer && '0.3'
  }  
  return (
    <img
      onClick={onClick}
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
