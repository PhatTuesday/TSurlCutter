
import sqlite3 from 'sqlite3';
import { DataStoreFactory } from './class/dataStoreFactoryClass'
import { DataStoreType } from './dataStore'

async function main(URL: string) {
    const localDataStore = await DataStoreFactory.MakeDataStore(DataStoreType.LOCAL)
    const regex = /^[^/.]+$/;
    const isShortURL = regex.test(URL);
    // const isExistsShortURL = URLs.some(url => url.shortURL === URL);
    console.log(isShortURL);

    let outputURL: any
    if (isShortURL) {
        outputURL = localDataStore.getLongURL(URL);
    } else {
        outputURL = localDataStore.makeShortURL(URL);
    }
    console.log(outputURL);
}


main("youtube");


//TODO: Show that I have so far
//TODO: Do you want to work on the database
//TODO: