import { requestURL } from '../main'
import { URLs } from '../mockData'
import { describe, it, expect } from '@jest/globals'

describe('requestURL', () => {
    it('returns the long URL when the short URL is found', () => {
        const shortURL = URLs[0].shortURL;
        const longURL = URLs[0].longURL;
        expect(requestURL(shortURL)).toBe(longURL);
    });

    it('returns "URL not found" when the short URL is not found', () => {
        expect(requestURL('notfound')).toBe('URL not found');
    });
});


// TODO: Need to install this: npm install --save-dev jest ts-jest @types/jest