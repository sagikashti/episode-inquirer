/* eslint-disable @next/next/no-img-element */
"use client"

// Import the custom hook for local storage
import { useLocalStorage } from "@/app/shared/hooks/api/useLocalStorge";

// Import the CSS file for styling
import "./Episode.css";

// Import the React icons
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Define the interface for the Episode object
export interface Episode {
    score: number | string;
    show: {
        id: string;
        name: string;
        image: {
            medium: string;
            original: string;
        };
        genres: string | string[];
    }
}

// Episode Component
export const Episode = (props: { episode: Episode }) => {
    // Extract the episode object from props
    const episode = props.episode;

    // Use the custom useLocalStorage hook to handle local storage
    const [value, handleSetValue] = useLocalStorage(episode.show.id);

    return (
        // Episode container
        <div className="episode-container">
            {/* Center the image */}
            <div className="center">
                {/* Display the episode show image */}
                <img src={episode.show?.image?.medium} alt={episode.show.name + " image"} />
            </div>

            {/* Episode body */}
            <div className="episode-body">
                <div>
                    {/* Display the episode show name */}
                    <div><h5>{episode.show.name}</h5></div>
                    {/* Display the episode score */}
                    <div>{episode.score}</div>
                </div>

                {/* Display the episode show genres */}
                <div className="font-medium">{episode.show.genres}</div>
            </div>

            {/* Add a heart icon, and handle its onClick event to update local storage */}
            <div onClick={() => handleSetValue(episode)}>
                {/* Display the filled heart icon if the episode is in local storage */}
                {value ? <AiFillHeart style={{ color: "red" }} /> : <AiOutlineHeart />}
            </div>
        </div>
    );
};
