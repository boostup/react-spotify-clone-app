import { useDispatch, useSelector } from "react-redux";

import { selectAuthUser } from "_redux/auth/selectors";
import { authStart } from "_redux/auth/actions";
import { getUser } from "utils/localStorage";

export default function useAuth() {
  const dispatch = useDispatch();
  const localStorageUser = getUser();
  const stateUser = useSelector(selectAuthUser);
  if (!stateUser && localStorageUser) {
    dispatch(authStart());
  }
  return stateUser;
}
