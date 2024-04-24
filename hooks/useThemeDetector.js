import { useState } from "react";

const useThemeDetector = () => {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());  
    const mqListener = (e => {
        setIsDarkTheme(e.matches);
    });
    
    useEffect(() => {
        console.log(isDarkTheme);
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      darkThemeMq.addEventListener(mqListener);
      return () => darkThemeMq.removeEventListener(mqListener);
    }, []);
    return {isDarkTheme, setIsDarkTheme};
}

export default useThemeDetector;