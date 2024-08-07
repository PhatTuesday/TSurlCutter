
import { URLs } from './mockData'
import { IURL } from './interface'

function requestURL(URL: string): string {
    const urlObject = URLs.find(url => url.shortURL === URL);
    if (urlObject) {
        console.log(urlObject.longURL)
        return urlObject.longURL;
    } else {
        console.log("URL not found")
        return "URL not found";
    }
}

const url = requestURL('youtube');

// async function main() {
//     const localDataStore = await dataStoreFactory
// }