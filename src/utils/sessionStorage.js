const { REACT_APP_LOCAL_STORAGE_KEY } = process.env;

export function get() {
  try {
    return JSON.parse(sessionStorage.getItem(REACT_APP_LOCAL_STORAGE_KEY));
  } catch (error) {
    return {};
  }
}

export function set(toStore) {
  sessionStorage.setItem(REACT_APP_LOCAL_STORAGE_KEY, JSON.stringify(toStore));
}
