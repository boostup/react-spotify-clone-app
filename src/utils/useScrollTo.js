import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectItemPage } from "redux/item-page/selectors";

/**
 *
 * This is useful to ensure that when going from one item(playlist|album) to another, the page is scrolled back to the top
 *
 * @param {int} value the amount of pixels to scroll to
 */
export default function useScrollTo(value = 0) {
  const itemState = useSelector(selectItemPage);
  const HTMLelementRef = useRef();

  useEffect(() => {
    HTMLelementRef.current.scrollTop = value;
  }, [itemState, value]);

  return HTMLelementRef;
}
