import {IDataStore, IURL} from "../interface";
// import { DataStoreType} from "../dataStore";
import { URLs } from "../mockData";


export abstract class BaseDataStore implements IDataStore {
    protected urlPairs: IURL[];

    constructor() {
        this.urlPairs = [];
    }

    abstract loadData(): Promise<void>;
    abstract saveData(): Promise<void>;

    makeShortURL(longUrl: string): string {
        const existingPair = this.urlPairs.find(pair => pair.longURL === longUrl);
        if (existingPair) {
            return existingPair.shortURL;
        }
        const shortUrl = this.generateShortUrl(longUrl);
        this.urlPairs.push({ longURL: longUrl, shortURL: shortUrl });
        this.saveData();
        return shortUrl;
    }

    getLongURL(shortUrl: string): string {
        const pair = this.urlPairs.find(pair => pair.shortURL === shortUrl);
        return pair ? pair.longURL : '';
    }

    private generateShortUrl(longUrl: string): string {
        const pair = this.urlPairs.find(pair => pair.longURL === longUrl);
        return pair ? pair.shortURL : '';
    }
}

export class LocalDataStore extends BaseDataStore {
    async loadData(): Promise<void> {
        this.urlPairs = URLs;
    }

    async saveData(): Promise<void> {
        console.log('Saving data locally');
    }
}

export class MongoDataStore extends BaseDataStore {
    async loadData(): Promise<void> {
        this.urlPairs = URLs;
    }

    async saveData(): Promise<void> {
        console.log('Saving data to MongoDB');
    }
}

export class PostgreSQLDataStore extends BaseDataStore {
    async loadData(): Promise<void> {
        this.urlPairs = URLs;
    }

    async saveData(): Promise<void> {
        console.log('Saving data to PostgreSQL');
    }
}