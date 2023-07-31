"use client"
import { useEffect, useState } from "react";

/**
 * Helper function to format the value for storing in local storage.
 * @param {string | null} value - The value to be formatted.
 * @returns {string | null} - The formatted value as a JSON string or null if the input is null.
 */
const formatValue = (value: string | null): any => {
    return value ? JSON.stringify(value) : null;
};

/**
 * Custom hook for managing data in local storage with easy retrieval and modification.
 * @param {string} key - The key to use for storing the data in local storage.
 * @returns {[string | null, (newValue: string) => void]} - A tuple containing the stored value and a function to set the value.
 */
const useLocalStorage = (key: string) => {
    // State variable to manage the stored value
    const [value, setValue] = useState(formatValue(localStorage.getItem(key) || null));

    /**
     * Function to set the value in local storage and update the state accordingly.
     * If the value is null, it will remove the corresponding item from local storage.
     * @param {string} newValue - The new value to be stored in local storage.
     */
    const handleSetValue = (newValue: string) => {
        if (!value) {
            // If the current value is null, set the new value in local storage and update the state
            localStorage.setItem(key, formatValue(newValue));
            setValue(newValue);
        } else {
            // If the current value is not null, remove the item from local storage and set the state to null
            localStorage.removeItem(key);
            setValue(null);
        }
    };

    // Effect hook to retrieve the stored value from local storage on initial render
    useEffect(() => {
        setValue(formatValue(localStorage.getItem(key)));
    }, [key]);

    // Return the stored value and the function to set the value as a tuple
    return [value, handleSetValue];
};

export {
    useLocalStorage
};
