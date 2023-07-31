"use client"
import { usePathname, useSearchParams } from 'next/navigation'
/**
 * Custom hook to extract route data from the current URL pathname and search parameters.
 * It uses the 'usePathname' and 'useSearchParams' hooks to get the relevant data.
 *
 * @returns {[string, string | null]} - A tuple containing the current pathname and the value of the 'q' parameter in the search string, if available.
 * The first element of the tuple is the 'pathname' (string), which represents the current URL pathname.
 * The second element is 'searchParams' (string | null), which holds the value of the 'q' parameter from the search string or null if not present.
 */
export const useRouteData = () => {
    // Get the current URL pathname using the 'usePathname' hook
    const pathname = usePathname();

    // Get the value of the 'q' parameter from the search string using the 'useSearchParams' hook
    // Note: 'useSearchParams' is not a standard React hook, and it's assumed to be a custom hook returning search parameters.
    // Ensure that the custom 'useSearchParams' hook is defined and provides the functionality to extract search parameters.
    // The 'get' method is used to specifically get the value of the 'q' parameter.
    const searchParams = useSearchParams().get('q');

    // Return the extracted data as a tuple
    return [pathname, searchParams];
};
