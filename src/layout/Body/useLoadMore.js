import { useDispatch } from "react-redux";
import { loadMore } from "_redux/events/actions";

/**
 *
 * This is useful to detect when the `Body` component is scrolled all the way down, that the action to load more is dispatched.
 *
 */
export default function useLoadMore(offset = 2000) {
  const dispatch = useDispatch();

  return function shouldLoadMore(e) {
    const bodyElement = e.target;

    if (
      bodyElement.scrollHeight - bodyElement.scrollTop <=
      bodyElement.clientHeight + offset
    ) {
      dispatch(loadMore());
    }
  };
}
