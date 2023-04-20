import { useCallback, useEffect, useState } from "react";
const useWindow = () => {
    const [scrollPosition, setScrollPosition] = useState({
        x: 0,
        y: 0,
    });
    const [windowPaneSize, setWindowPaneSize] = useState({
        width: 0,
        height: 0,
    });
    const updateScrollPosition = useCallback(() => {
        if (typeof window === "undefined")
            return;
        setScrollPosition((prevState) => ({
            ...prevState,
            x: window.scrollX,
            y: window.scrollY,
        }));
    }, []);
    const updatePaneSize = useCallback(() => {
        if (typeof window === "undefined")
            return;
        setWindowPaneSize((prevState) => ({
            ...prevState,
            height: window.innerHeight,
            width: window.innerWidth,
        }));
    }, []);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        window.addEventListener("scroll", updateScrollPosition);
        window.addEventListener("resize", updatePaneSize);
        updatePaneSize();
        // eslint-disable-next-line consistent-return
        return () => {
            window.removeEventListener("scroll", updateScrollPosition);
            window.removeEventListener("resize", updatePaneSize);
            updatePaneSize();
        };
    }, []);
    return {
        scrollPosition,
        paneSize: windowPaneSize,
    };
};
export default useWindow;