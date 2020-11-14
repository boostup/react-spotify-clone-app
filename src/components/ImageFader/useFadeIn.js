import { useEffect, useState } from "react";

export default function useCrossFade({ props }) {
  const [state, setState] = useState({
    topSrc: props.src,
    opacity: 0,
    bottomSrc: null,
    position: "relative",
  });

  useEffect(() => {
    let timer = null;

    // CSS values to transition TO
    setState((_state) => {
      timer = setTimeout(() => {
        setState((_state) => {
          return {
            ..._state,
            opacity: 0.99,
          };
        });
      }, Math.floor(Math.random() * 600) + 200); //so that all images do not fade in at the same time!

      // CSS values to transition FROM
      return {
        ..._state,
        topSrc: props.src,
        opacity: 0.09,
      };
    });

    return () => clearTimeout(timer);
  }, [props.src]);

  return state;
}
