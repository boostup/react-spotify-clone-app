import { useSelector } from "react-redux";
import { selectHeader } from "_redux/header/selectors";

export function useDisplaySearchBar() {
  const { displaySearchBar } = useSelector(selectHeader);

  const searchBarClassName = () =>
    displaySearchBar ? "showSearchbar" : "hideSearchbar";

  return [displaySearchBar, searchBarClassName];
}
