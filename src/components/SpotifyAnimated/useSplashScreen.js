import { useEffect, useState } from "react";
import { get, set } from "utils/sessionStorage";

export const SPLASH_SCREEN_DURATION = 4000;

export function splashScreenWasDisplayed() {
  const stored = get();
  set({
    ...stored,
    splashScreen: true,
  });
}

export function canDisplaySplashScreen() {
  const stored = get();
  return !stored ? true : false;
}

export const useSplashScreen = () => {
  const [displaySplashScreen, setDisplaySplashScreen] = useState(
    canDisplaySplashScreen()
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplaySplashScreen();
      splashScreenWasDisplayed();
    }, SPLASH_SCREEN_DURATION);
    return () => clearTimeout(timer);
  }, []);
  return displaySplashScreen;
};
