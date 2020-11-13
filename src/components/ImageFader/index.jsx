import React from "react";

import useCrossFade from "./useCrossFade";
import useFadeIn from "./useFadeIn";

const ImageFader = (props) => {
  const _props = combineProps(defaultProps, props);

  const myState = effects[_props.type]({ props: _props });

  const {
    containerClass,
    duration,
    timingFunction,
    delay,
    style,
    alt,
  } = _props;

  const { topSrc, opacity, position, bottomSrc } = myState;

  return (
    <div
      className={containerClass}
      style={{ ...defaultStyle, ...{ position: "relative" } }}
    >
      {topSrc && (
        <img
          style={{
            ...defaultStyle,
            ...style,
            ...{
              position: position,
              opacity: opacity,
              transition: `opacity ${duration / 1000}s ${timingFunction} ${
                delay / 1000
              }s`,
            },
          }}
          src={topSrc}
          alt={alt}
          title={alt}
        />
      )}
      {bottomSrc && (
        <img
          style={{
            ...defaultStyle,
            ...style,
          }}
          src={bottomSrc}
          alt={alt}
          title={alt}
        />
      )}
    </div>
  );
};

function combineProps(defaults, overload) {
  return {
    ...defaults,
    ...overload,
  };
}

const effects = {
  crossFade: useCrossFade,
  fadeIn: useFadeIn,
};

const defaultStyle = { maxWidth: "100%", maxHeight: "100%" };

const defaultProps = {
  duration: 700, //min: 700 otherwise fading is not perceptible
  timingFunction: "ease",
  delay: 0,
  containerClass: "Image",
  type: "fadeIn", //"crossFade" || "fadeIn"
};

export default ImageFader;
