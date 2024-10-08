
import { URLs } from './mockData'
import { DataStoreFactory } from './class/dataStoreFactoryClass'
import { DataStoreType } from './dataStore'

//Way 1
// export function requestURL(URL: string): string {
//     const urlObject = URLs.find(url => url.shortURL === URL);
//     if (urlObject) {
//         console.log(urlObject.longURL)
//         return urlObject.longURL;
//     } else {
//         console.log("URL not found")
//         return "URL not found";
//     }
// }
//
// const url = requestURL('youtube');

//Way 2
// async function main() {
//     const localDataStore = await DataStoreFactory.MakeDataStore(DataStoreType.LOCAL)
//     const shortUrl = localDataStore.makeShortURL('https://www.amazon.com/')
//     const longUrl = localDataStore.getLongURL(shortUrl);
//     console.log(longUrl);
//     console.log(shortUrl);
// }

// Way 3 This one will take what ever URL you give it and allow you to get the short URL or the long URL
async function main(URL: string) {
    const localDataStore = await DataStoreFactory.MakeDataStore(DataStoreType.LOCAL)
    const regex = /(https?:\/\/)? (www\.)? (\.com)? /;
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


main("www.ryan.com");


//TODO: Show that I have so far
//TODO: Do you want to work on the database
//TODO: