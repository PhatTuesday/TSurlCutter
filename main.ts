
import {URLs} from './mockData'
import {IURL, rl} from './Interface'



function requestURL(URL: string): string {
    return URLs[URL]
}

rl.question('Please enter a short URL:', (URL: string) => {
    const url = requestURL(URL);
    console.log('returned url', url);
    rl.close();
});
