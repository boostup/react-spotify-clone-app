import React, { useState } from "react";
import { Grow } from "@material-ui/core";

const ImageLoader = ({ className, src, alt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <Grow in={isImageLoaded}>
      <img
        onLoad={() => setIsImageLoaded(true)}
        className={className}
        src={src}
        alt={alt}
        title={alt}
      />
    </Grow>
  );
};

export default ImageLoader;
