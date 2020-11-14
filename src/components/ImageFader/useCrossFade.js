import { useEffect, useState } from "react";

export default function useCrossFade({ props }) {
  const [state, setState] = useState({
    topSrc: props.src,
    opacity: 1,
    bottomSrc: props.src,
    position: "absolute",
  });

  useEffect(() => {
    let timer = null;

    // CSS values to transition FROM
    setState((_state) => {
      return {
        ..._state,
        bottomSrc: props.src,
        opacity: 0,
      };
    });

    timer = setTimeout(() => {
      // CSS values to transition TO
      setState((_state) => {
        return {
          ..._state,
          topSrc: props.src,
          opacity: 1,
        };
      });
    }, 700);

    return () => clearTimeout(timer);
  }, [props.src, state.topSrc]);

  return state;
}
