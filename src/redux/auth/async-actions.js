import { spotifyAPI } from "../../libs/spotify";
import { setUser } from "./actions";

export function getMeAsync(dispatch) {
  return spotifyAPI.getMe().then((user) => {
    dispatch(setUser(user));
    return user;
  });
}
