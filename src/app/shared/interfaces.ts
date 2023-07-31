/**
 * Interface representing the URL props used in various components or functions.
 * It defines the shape of the 'url' property that contains the URL string.
 */
export interface UrlProps {
    url: string;
}

/**
 * Interface representing a textual error message.
 * It defines the shape of the 'message' property, which is an optional string
 * used to provide additional information about the error.
 */
export interface TextError {
    message?: string;
}
