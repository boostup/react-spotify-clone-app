import React, { useState } from "react";
import { CircularProgress, Grow } from "@material-ui/core";

import "./ImageLoader.css";
import Busy from "components/Busy";

const ImageLoader = ({ className, src, alt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div className="imageLoader">
      <Grow in={isImageLoaded}>
        <img
          onLoad={() => setIsImageLoaded(true)}
          className={isImageLoaded ? className : "hidden"}
          src={src}
          alt={alt}
          title={alt}
        />
      </Grow>
      {isImageLoaded ? null : <Busy />}
    </div>
  );
};

export default ImageLoader;
