import {IDataStore} from "./Interface";
import { DataStoreType} from "./dataStore";
import { URLs } from "./mockData";

export class DataStoreFactory {
    static async MakeDataStore(type: DataStoreType): Promise<IDataStore> {
        let dataStore: BaseDataStore;
        switch (type) {
            case DataStoreType.LOCAL:
                dataStore = new LocalDataStore();
                break;
            default:
                throw new Error('Invalid data store type');
            case DataStoreType.MONGO:
                return new MongoDataStore();
            case DataStoreType.POSTGRESQL:
                return new PostgreSQLDataStore();
        }
        await dataStore.loadData();
        return dataStore;
    }
}

abstract class BaseDataStore implements IDataStore {
        protected urlPairs: IURLPair[];

        constructor() {
            this.urlPairs = [];
        }

        abstract loadData(): Promise<void>;
        abstract saveData(): Promise<void>;

        makeShortUrl(longUrl: string): string {
            const existingPair = this.urlPairs.find(pair => pair.longUrl === longUrl);
            if (existingPair) {
                return existingPair.shortUrl;
            }
            const shortUrl = this.generateShortUrl();
            this.urlPairs.push({ longUrl, shortUrl });
            this.saveData();
            return shortUrl;
        }

        getLongUrl(shortUrl: string): string {
            const pair = this.urlPairs.find(pair => pair.shortUrl === shortUrl);
            return pair ? pair.longUrl : '';
        }

        private generateShortUrl(): string {
            // Generate a short URL
        }
    }

    class LocalDataStore extends BaseDataStore {
        async loadData(): Promise<void> {
            this.urlPairs = [mockData.URLs];
        }

        async saveData(): Promise<void> {
            console.log('Saving data locally');
        }
    }