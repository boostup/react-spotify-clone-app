import { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectHeaderClickToggle } from "_redux/header/selectors";
import { selectItem } from "_redux/item-page/selectors";

/**
 *
 * This is useful to ensure that when going from one item(playlist|album) to another, the page is scrolled back to the top
 *
 */
export default function useScrollIntoView(elementId) {
  const itemState = useSelector(selectItem);
  const headerClickToggle = useSelector(selectHeaderClickToggle);
  const HTMLelementRef = document.querySelector(elementId);

  useEffect(() => {
    return () => {
      if (HTMLelementRef)
        HTMLelementRef.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    };
  }, [itemState?.id, headerClickToggle, HTMLelementRef]);
}
