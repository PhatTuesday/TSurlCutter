import {URLs} from './mockData'
import {IURL} from './Interface'

let url = "..."

function requestURL(shortURL: string): string {
    return URLs[shortURL]
}

url = requestURL("youTube")

console.log(url)
