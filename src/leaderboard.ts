/** Name:   Interactive-leaderboard.leaderboard.ts
 *  Desc:   Leaderboard Logic, handles sorting of entries
 *  Author: Jimy Houlbrook
 *  Date:   12/11/24
 */

import { Container } from 'pixi.js';
import { Entry } from './entry';

export class Leaderboard extends Container{
    
    private entries: Array<Entry>;

    private static padding: {h: number, v: number} = {
        h: 100,
        v: 50
    }

    private _appH: number;
    private _appW: number;

    constructor(names: Array<string>, appW: number, appH: number){
        super();

        // Create entry for each name
        this.entries = [];

        this._appH = appH;
        this._appW = appW;

        for(let i = 0; i < names.length; i++){
            const entry = this.makeEntry(i, names[i]);
            this.entries.push(entry);
            this.addChild(entry)
        }
    }

    private makeEntry(i: number, name: string, score: number = 0){
        const h = this._appH/10;

        const x = Leaderboard.padding.h;
        const y = (i*h) + ((i+1)*Leaderboard.padding.v);

        return new Entry(
            x, y, this._appW - (Leaderboard.padding.h * 2),
            h, name, this, score
        )
    }

    public sortEntries(){
        this.entries.sort(function(a, b){return b.score - a.score});
        this.repositionEntries();
    }

    private repositionEntries(){
        for(let i = 0; i< this.entries.length; i++){
            let curEntry = this.entries[i];

            const entry = this.makeEntry(i, curEntry.name, curEntry.score);
            this.entries[i] = entry;
            this.addChild(entry)

            curEntry.destroy();
        }
    }
}