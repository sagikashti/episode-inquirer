
"use client"

import { useFetch } from "../../shared/hooks/api/useFetch";
import Spinner from 'react-bootstrap/Spinner';
import { TextError, UrlProps } from "../../shared/interfaces";
import styles from '../../page.module.css';
import { useEffect, useState } from "react";
import { episodeFormatter } from "../../shared/utils";
import { Episode } from "../Episode/Episode";

/**
 * EpisodesList Component Documentation:
 * The EpisodesList component fetches data from a provided URL using the useFetch hook.
 * It then formats the fetched data into an array of Episode objects using the episodeFormatter utility function.
 * The component renders a list of Episode components with the formatted data.
 *
 * @param {UrlProps} props - An object containing the URL to fetch data from.
 * @returns {JSX.Element} - The JSX element representing the EpisodesList component.
 */
export const EpisodesList = (props: UrlProps) => {
    // Fetch data from the provided URL using the useFetch hook.
    const [fetchedData, isLoading, error] = useFetch({ url: props.url });

    // Store the formatted list of episodes in the component state.
    const [formattedEpisodesList, setFormattedEpisodesList] = useState<Episode[]>([]);

    // When the fetched data or URL changes, update the formattedEpisodesList using the episodeFormatter utility.
    useEffect(() => {
        setFormattedEpisodesList(episodeFormatter(fetchedData as Array<any>));
    }, [fetchedData, props.url]);

    // Render the content based on the loading state and the existence of episodes.
    return <>
        {/* Display a spinner while data is being fetched */}
        {isLoading && <Spinner style={{ overflow: 'hidden' }} animation="border" variant="info" />}

        {/* Display an error message if there's an error */}
        {error && <div className={styles.warning}>{(error as TextError)?.message}</div>}

        {/* Render the list of episodes if data is fetched successfully */}
        {!isLoading && !error && formattedEpisodesList?.length > 0
            && formattedEpisodesList.map((episode: Episode, i) => <Episode key={i} episode={episode} />)}

        {/* Display a message if there are no results */}
        {!isLoading && formattedEpisodesList?.length === 0 && <div>No results</div >}
    </>;
}
