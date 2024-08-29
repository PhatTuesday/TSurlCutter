import {BaseDataStore} from "./classes";
import * as sqlite3 from 'sqlite3';
import { IDataStore, IURL } from "../interface";


export class SQLiteDataStore extends BaseDataStore {
    private db: sqlite3.Database;
    constructor() {
        super();
        this.db = new sqlite3.Database('./urlData.db');
    }

    async loadData(): Promise<void> {
        this.db.all("SELECT * FROM urlPairs", (err, rows) => {
            if (err) {
                throw err;
            }
            this.urlPairs = rows;
        });
    }

    async saveData(): Promise<void> {
        this.urlPairs.forEach(pair => {
            this.db.run(`INSERT INTO urlPairs(longURL, shortURL) VALUES(?, ?)`, [pair.longURL, pair.shortURL], (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    }
}