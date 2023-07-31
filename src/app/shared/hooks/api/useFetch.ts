"use client"

import { useEffect, useState } from "react";
import { TextError, UrlProps } from "../../interfaces";
import { Episode } from "@/app/components/Episode/Episode";

/**
 * Custom hook for fetching data from an API or local storage based on the provided URL.
 * @param {UrlProps} props - An object containing the URL for fetching data.
 * @returns {[Episode[], boolean, TextError | null]} - A tuple containing the fetched data, loading state, and error, if any.
 */
export const useFetch = (props: UrlProps) => {
    // State variables to manage fetched data, loading state, and errors
    const [fetchedData, setFetchedData] = useState<Episode[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<TextError | null>(null);

    // Extract the URL from the props
    const url = props.url;

    /**
     * Function to fetch data based on the provided URL.
     * If the URL is 'favourites', it fetches data from local storage.
     * Otherwise, it performs an AJAX request to fetch data from an API.
     * @param {string} url - The URL to fetch data from.
     */
    const getData = async (url: string) => {
        try {
            if (url === 'favourites') {
                // Get data from local storage if the URL is 'favourites'
                const keys = Object.keys(localStorage);
                const favouriteEpisodes = [];
                for (var i = 0, len = keys.length; i < len; ++i) {
                    const storedItem = localStorage.getItem(keys[i]);
                    if (storedItem !== null) {
                        const item = JSON.parse(storedItem) as Episode;
                        if (item?.score) {
                            favouriteEpisodes.push(item);
                        }
                    }
                }
                // Update the state with the fetched data and mark loading as false
                setFetchedData(favouriteEpisodes);
                setIsLoading(false);
                return;
            }

            // Perform an AJAX request to fetch data from the provided URL
            const res = await fetch(url);
            const resFetchedData = await res.json();
            // Update the state with the fetched data and mark loading as false
            setFetchedData(resFetchedData);
            setIsLoading(false);
        } catch (error: any) {
            // If an error occurs during fetching, set the error state and mark loading as false
            setError(error);
            setIsLoading(false);
        }
    };

    // Effect hook to handle data fetching based on the provided URL
    useEffect(() => {
        // Set loading state to true before starting the fetch
        setIsLoading(true);

        // Use a debounced timer to prevent rapid consecutive fetch calls
        const timer = setTimeout(() => {
            // Fetch data based on the provided URL
            getData(props.url);
        }, 500);

        // Clean up the timer and set loading to false on component unmount or URL change
        return () => {
            clearTimeout(timer);
            setIsLoading(false);
        };
    }, [props.url]); // This effect will re-run only if the 'url' prop changes

    // Return the fetched data, loading state, and error as an array
    return [fetchedData, isLoading, error];
};
