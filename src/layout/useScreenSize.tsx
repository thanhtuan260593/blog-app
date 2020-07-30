import { useState, useEffect } from "react";
export enum ScreenSize {
  LARGE,
  MEDIUM,
  SMALL,
}
function getScreenSize() {
  const { innerWidth: width } = window;
  if (width < 640) return ScreenSize.SMALL;
  if (width < 1008) return ScreenSize.MEDIUM;
  return ScreenSize.LARGE;
}

export default function useScreenSize() {
  const [screenSize, setWindowDimensions] = useState(getScreenSize());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getScreenSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
