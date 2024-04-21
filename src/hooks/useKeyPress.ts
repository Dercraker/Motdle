import { useEffect } from "react";

const useKeyPress = (callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener("keypress", callback);

    return () => {
      document.removeEventListener("keypress", callback);
    };
  }, [callback]);
};

export default useKeyPress;
