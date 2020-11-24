import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { selectHeaderClickToggle } from "redux/header/selectors";
import { selectItemPage } from "redux/item-page/selectors";

/**
 *
 * This is useful to ensure that when going from one item(playlist|album) to another, the page is scrolled back to the top
 *
 * @param {int} value the amount of pixels to scroll to
 */
export default function useScrollTop() {
  const itemState = useSelector(selectItemPage);
  const headerClickToggle = useSelector(selectHeaderClickToggle);
  const HTMLelementRef = useRef();

  useEffect(() => {
    HTMLelementRef.current.scrollTop = 0;
  }, [itemState, headerClickToggle]);

  return HTMLelementRef;
}
