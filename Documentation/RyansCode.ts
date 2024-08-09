interface IURLPair {
    longUrl: string;
    shortUrl: string;
}

interface IDataStore {
    makeShortUrl(longUrl: string): string;
    getLongUrl(shortUrl: string): string;
}

enum DataStoreType {
    LOCAL,
    MONGO,
    POSTGRESQL
}

const mockUrlData: IURLPair = {longUrl: "https://www.google.com/test/something/its-a-long-url/anotherThing?=test12345", shortUrl: "https://jakesdomain.com/12345"}

class DataStoreFactory {
    static async MakeDataStore(type: DataStoreType): Promise<IDataStore> {
        let dataStore: BaseDataStore;
        switch (type) {
            case DataStoreType.LOCAL:
                dataStore = new LocalDataStore();
                break;
            default:
                throw new Error('Invalid data store type');
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
        return 'https://jakesdomain.com/' + Math.random().toString(36).substr(2, 5);
    }
}

class LocalDataStore extends BaseDataStore {
    async loadData(): Promise<void> {
        this.urlPairs = [mockUrlData];
    }

    async saveData(): Promise<void> {
        console.log('Saving data locally');
    }
}

class URLShortener {
    private dataStore: IDataStore;

    constructor(dataStore: IDataStore) {
        this.dataStore = dataStore;
    }

    public getShortUrl(longUrl: string): string {
        return this.dataStore.makeShortUrl(longUrl);
    }
    public getLongUrl(shortUrl: string): string {
        return this.dataStore.getLongUrl(shortUrl);
    }
}
async function main() {
    const localDataStore = await DataStoreFactory.MakeDataStore(DataStoreType.LOCAL);
    const UrlService = new URLShortener(localDataStore);

    console.log(UrlService.getLongUrl("https://jakesdomain.com/12345"));
    console.log(UrlService.getShortUrl("https://www.google.com/test/something/its-a-long-url/anotherThing?=test12345"));
}

main();