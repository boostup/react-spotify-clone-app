import { useState, useEffect } from "react";

export function useDisplayHeaderBackground(scrollValue) {
  const [hasHeaderScrolled, sethasHeaderScrolled] = useState(false);

  //Effect to display or hide the Header background
  useEffect(() => {
    const shouldDisplay = scrollValue >= 70 ? true : false;
    if (hasHeaderScrolled !== shouldDisplay)
      sethasHeaderScrolled(shouldDisplay);
  }, [scrollValue, hasHeaderScrolled]);

  return hasHeaderScrolled;
}
