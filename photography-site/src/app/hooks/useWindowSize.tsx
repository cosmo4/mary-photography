import { useState, useEffect } from "react";

function useWindowSize(): { width: number; height: number } {
  // Initialize with current window size
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup event listener on unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;