"use client"
import { Episode } from "../components/Episode/Episode";

/**
 * Function to format an array of episodes with optional scores and rating data into a consistent Episode array format.
 * @param {Array<any>} episodes - An array of episodes with optional score and rating data.
 * @returns {Episode[]} - An array of Episode objects, each containing formatted episode details.
 */
export const episodeFormatter = (episodes: Array<any>): Episode[] => {
    episodes = episodes.map(episode => {
        let formattedEpisode: Episode;
        if (episode?.score) {
            // Format the genres as a pipe-separated string
            episode.show.genres = arrayToStringFormatter(episode.show.genres);

            // Format the score as a rounded number string
            episode.score = formatNumber(+episode.score);

            // Keep the existing episode as it already contains required formatting
            formattedEpisode = episode;
        } else {
            // Create a new formatted Episode object with rating.average as the score
            formattedEpisode = {
                score: formatNumber(+episode.rating.average),
                show: {
                    id: episode.id,
                    name: episode.name,
                    image: episode.image,
                    genres: arrayToStringFormatter(episode.genres)
                },
            };
        }
        return formattedEpisode;
    });

    // Return the formatted episodes as an array of Episode objects
    return episodes as Episode[];
}

/**
 * Function to convert an array of strings or a single string into a pipe-separated string.
 * @param {Array<string> | string} input - The input array of strings or a single string.
 * @returns {string} - A pipe-separated string if the input is an array, or the original string if it's a single string.
 */
const arrayToStringFormatter = (input: Array<string> | string): string => {
    if (Object.prototype.toString.call(input) === '[object Array]') {
        // Convert the array of strings into a pipe-separated string
        return (input as Array<string>).map(str => stringToUpperCase(str)).join("|");
    } else {
        // Return the original string as it is
        return input as string;
    }
}

/**
 * Function to convert the first character of a string to uppercase.
 * @param {string} str - The input string.
 * @returns {string} - The input string with the first character converted to uppercase.
 */
const stringToUpperCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Function to format a number as a string with one decimal place.
 * @param {number} number - The input number.
 * @returns {number | string} - The input number rounded to one decimal place as a string.
 */
const formatNumber = (number: number): number | string => {
    const roundedNumber = number.toFixed(1);
    return roundedNumber;
}
