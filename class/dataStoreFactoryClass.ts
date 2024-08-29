import { DataStoreType } from "../dataStore";
import { IDataStore } from "../interface";
import { BaseDataStore, LocalDataStore, MongoDataStore, PostgreSQLDataStore } from "./classes";

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