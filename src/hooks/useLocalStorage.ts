import { useEffect, useState } from "react";

type UseLocalStorageProps<T> = {
    key: string;
    defaultValue?: T;
};

const useLocalStorage = <T>({ key, defaultValue }: UseLocalStorageProps<T>) => {
    const [items, setItems] = useState<T>(defaultValue as T);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const savedItems = localStorage.getItem(key);
            if (savedItems) {
                setItems(JSON.parse(savedItems) as T);
            }
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
        }
    }, [key]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            localStorage.setItem(key, JSON.stringify(items));
        } catch (error) {
            console.error("Error writing localStorage key:", key, error);
        }
    }, [key, items]);

    return [items, setItems] as const;
};

export default useLocalStorage;
