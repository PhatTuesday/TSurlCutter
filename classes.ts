import {IDataStore, IURL} from "./interface";
import { DataStoreType} from "./dataStore";
import { URLs } from "./mockData";

export class DataStoreFactory {
    static async MakeDataStore(type: DataStoreType): Promise <IDataStore> {
        let dataStore: BaseDataStore;
        switch (type) {
            case DataStoreType.LOCAL:
                dataStore = new LocalDataStore();
                break;
            default:
                throw new Error('Invalid data store type');
            case DataStoreType.MONGO:
                dataStore = new MongoDataStore();
                break;
            case DataStoreType.POSTGRESQL:
                dataStore = new PostgreSQLDataStore();
                break;
        }
        await dataStore.loadData();
        return dataStore;
    }
}

abstract class BaseDataStore implements IDataStore {
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

    class LocalDataStore extends BaseDataStore {
        async loadData(): Promise<void> {
            this.urlPairs = URLs;
        }

        async saveData(): Promise<void> {
            console.log('Saving data locally');
        }
    }

    class MongoDataStore extends BaseDataStore {
        async loadData(): Promise<void> {
            this.urlPairs = URLs;
        }

        async saveData(): Promise<void> {
            console.log('Saving data to MongoDB');
        }
    }

    class PostgreSQLDataStore extends BaseDataStore {
        async loadData(): Promise<void> {
            this.urlPairs = URLs;
        }

        async saveData(): Promise<void> {
            console.log('Saving data to PostgreSQL');
        }
    }