import { useState, useEffect } from "react";

export function useSidebarSize() {
    const [sidebarSize, setSidebarSize] = useState(
        localStorage.getItem("open") === "large" ? "pl-64" : "pl-36"
    );

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "open") {
                setSidebarSize(event.newValue === "large" ? "pl-64" : "pl-36");
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const checkLocalStorage = () => {
            const currentSidebarSize = localStorage.getItem("open") === "large" ? "pl-64" : "pl-36";
            if (currentSidebarSize !== sidebarSize) {
                setSidebarSize(currentSidebarSize);
            }
        };

        const interval = setInterval(checkLocalStorage, 1000);

        return () => clearInterval(interval);
    }, [sidebarSize]);

    return sidebarSize;
}