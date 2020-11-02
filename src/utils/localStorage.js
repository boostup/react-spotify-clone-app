const LOCAL_STORAGE_KEY = "react-spotify-clone-app";

function get() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
}

function set(toStore) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toStore));
}

export function setUser(_user) {
  const stored = get();
  set({
    ...stored,
    user: _user,
  });
}

export function getUser() {
  const stored = get();
  return stored && stored.user ? stored.user : false;
}

export function setToken(_token) {
  const stored = get();
  set({
    ...stored,
    token: _token,
  });
}

export function getToken() {
  const stored = get();
  return stored && stored.token ? stored.token : false;
}
