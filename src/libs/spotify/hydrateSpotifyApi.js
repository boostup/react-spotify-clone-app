// import { setToken } from "../../state/actions";
// import { getToken } from "utils/localStorage";
// import { spotifyAPI } from "./index";

/**
 * * Note on usage
 * ***************
 * If this function is called inside a `useEffect` hook, which is most likely, than its array of dependencies must include `state.token`.
 *
 * @param {Error} error
 * @param {Function} dispatch
 *
 */
export function hydrateSpotifyApi(error, dispatch) {
  if (error?.status >= 400) {
    console.log("EXCEPTION CAUGHT");
    // const token = getToken();
    // spotifyAPI.setAccessToken(token);
    // dispatch(setToken(token));
  }
}

/**
 *
 * Background to understand the requirements for this function
 * ***********************************************************
 *
 * On routes such as `/library` or `/home`, and basically any route where a component makes an API request, there is a case where it will fail.
 *
 * This is when and if the browser `refresh` button is pressed. Why, because, the routes that provide the token to the API wrapper are note called, because this happens, as a general routine, during manual and automatic login.
 *
 * The way the API wrapper works is that it take the token once, and all subsequent API calls are automatically supplied with the token.  But when the refresh button is pressed, it will need to be re-hydrated with the API Token.
 *
 * This is all that this is function does.
 *
 * Down sides of this solution
 * ****************************
 * The down-side of this approach is that the developer must remember to add a `.catch` block to every new API call promise.  If they forget, than we potentially have introduced a new bug, if or when the user click the browser button.
 *
 * This is why I have attempted to find a more generic solution, and those are the alternatives avenues that were explored :
 *
 * 1) via MainLayoutPageWrapper
 * 2) wrapping the API wrapper to systematically provided the Wrapper API with the token whenever My wrapper's functions are called
 * 3) drop the API wrapper altogether and create my own direct wrapper around the Web API END-POINTS I needed, and by using the `axios`, supply the token to all calls using HTTP INTERCEPTORS.
 *
 * Up sides of this solution
 * *************************
 *
 * Opting for using the exceptions raised by the API responses to serve the token as needed, was a very good quick-win because :
 * I did not have to write, maintain and test my own wrapper
 * All API calls should be supplied with a promise `.catch` block anyways
 * The solution reuses many parts that already existed, so it took a few minutes to compose and try it out, and it worked.
 *
 */
