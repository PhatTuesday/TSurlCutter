import * as readline from 'readline'
//NOT USED
export interface IURL {
    shortURL: string;
    longURL: string;
}
//NOT USED

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});