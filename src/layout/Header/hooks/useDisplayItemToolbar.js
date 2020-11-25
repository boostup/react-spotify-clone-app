import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleDisplayItemToolbar } from "redux/header/actions";
import { selectHeader } from "redux/header/selectors";
import { selectItemPage } from "redux/item-page/selectors";

export function useDisplayItemToolbar(scrollValue) {
  const dispatch = useDispatch();
  const { displayItemToolbar } = useSelector(selectHeader);
  const { item, isItemPage } = useSelector(selectItemPage);
  const itemName = item?.name;
  const itemURI = item?.uri;

  //Effect to display or hide the ItemToolbar in the Header
  useEffect(() => {
    //ItemBanner component height + ItemToolbar component height = 473px
    const candDisplayItemToolbar =
      isItemPage && scrollValue >= 473 ? true : false;
    if (displayItemToolbar !== candDisplayItemToolbar) {
      dispatch(toggleDisplayItemToolbar(candDisplayItemToolbar));
    }
  }, [dispatch, isItemPage, displayItemToolbar, scrollValue]);

  const itemToolbarClassName = () =>
    isItemPage && displayItemToolbar ? "showItemToolbar" : "hideItemToolbar";

  return [itemName, itemURI, itemToolbarClassName];
}
