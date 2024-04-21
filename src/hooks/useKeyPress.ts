import { useEffect } from "react";

const useKeyPress = (callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener("keyup", callback);

    return () => {
      document.removeEventListener("keyup", callback);
    };
  }, [callback]);
};

export default useKeyPress;
