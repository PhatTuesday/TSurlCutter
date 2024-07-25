
export interface IURL {
    shortURL: string;
    longURL: string;
}

export interface IDataStore {
    makeShortURL(longURL: string): string;
    getLongURL(shortURL: string): string;
}