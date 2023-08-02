

"use client"

import { useEffect, useState } from "react";
import { EpisodesList } from "../EpisodeList/EpisodesList";
import styles from '../../page.module.css';
import { useRouteData } from "../../shared/hooks/api/useRouteData";
import "./EpisodeManager.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * EpisodeManager Component Documentation:
 * The EpisodeManager component serves as the main component for managing TV series episodes.
 * It displays a title, navigation links, a search bar, and a list of episodes.
 * The episodes list is fetched based on the current URL and search criteria.
 * 
 * @returns {JSX.Element} - The JSX element representing the EpisodeManager component.
 */
export const EpisodeManager = () => {
    // State variables
    const [search, setSearch] = useState('');
    const [pathName, searchParams] = useRouteData();
    const [url, setUrl] = useState('');
    const router = useRouter();

    // The title for the page
    const title = "The TV Series Database";

    // Function to handle search input changes
    const handleSearch = (searchValue: string) => {
        if (pathName !== '/search') {
            router.push(`/search?q=${searchValue}`);
        }
        setSearch(searchValue);
    };

    // Effect to update the URL based on the path and search criteria
    useEffect(() => {
        switch (pathName) {
            case '/search':
                // Direct URL scenario only occurs on first bootstrap
                if (pathName === '/search' && searchParams && search === '' && url === '') {
                    setSearch(searchParams);
                };
                setUrl(`https://api.tvmaze.com/search/shows?q=${search}`);
                break;
            case '/favourites':
                setUrl('favourites');
                break;
            case '/':
                setUrl(`https://api.tvmaze.com/shows`);
                break;
            default:
                // Edge case scenario
                setUrl('')
        }
    }, [pathName, search, searchParams, url]);

    // Render the EpisodeManager component
    return (
        <div className="center">
            <div className="em-body">
                {/* Title */}
                <div className="center">
                    <h2>{title}</h2>
                </div>

                {/* Navigation and Search Bar */}
                <div className="em-search">
                    <div>
                        <div className="topnav">
                            {/* Navigation Links */}
                            <Link href="/" className={pathName === '/' ? "active" : ""}>All Series</Link>
                            <Link href="/favourites" style={{ marginLeft: "10px" }} className={pathName === '/favourites' ? "active" : ""}>Favourites</Link>
                        </div>
                    </div>
                    <div className="search">
                        {/* Search Input */}
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {/* Clear Button */}
                        <button
                            id="clear-button"
                            style={{ display: search !== '' ? "" : "none" }}
                            onClick={() => setSearch('  ')}
                        >X</button>
                    </div>
                </div>

                {/* List of Episodes */}
                <div>
                    <EpisodesList url={url} />
                </div>
            </div>
        </div>
    );
}
