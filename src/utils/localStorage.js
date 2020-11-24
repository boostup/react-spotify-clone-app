const { REACT_APP_LOCAL_STORAGE_KEY } = process.env;

function get() {
  try {
    return JSON.parse(localStorage.getItem(REACT_APP_LOCAL_STORAGE_KEY));
  } catch (error) {
    return {};
  }
}

function set(toStore) {
  localStorage.setItem(REACT_APP_LOCAL_STORAGE_KEY, JSON.stringify(toStore));
}

export function empty() {
  localStorage.setItem(REACT_APP_LOCAL_STORAGE_KEY, null);
}

export function storeUser(_user) {
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

export function storeToken(_token) {
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

export function storeTokenExpiry(_tokenExpiry) {
  const stored = get();
  set({
    ...stored,
    tokenExpiry: _tokenExpiry,
  });
}

export function getTokenExpiry() {
  const stored = get();
  return stored && stored.tokenExpiry ? stored.tokenExpiry : false;
}

export function storeRefreshToken(_refreshToken) {
  const stored = get();
  set({
    ...stored,
    refreshToken: _refreshToken,
  });
}

export function getRefreshToken() {
  const stored = get();
  return stored && stored.refreshToken ? stored.refreshToken : false;
}
