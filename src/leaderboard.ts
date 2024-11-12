/** Name:   Interactive-leaderboard.leaderboard.ts
 *  Desc:   Leaderboard Logic, handles sorting of entries
 *  Author: Jimy Houlbrook
 *  Date:   12/11/24
 */

import { Container, Point } from 'pixi.js';
import { Entry } from './entry';

// Class representing Leaderboard
export class Leaderboard extends Container{
    
    // Padding Values
    private static PADDING: {h: number, v: number} = {
        h: 100,
        v: 50
    }
    
    // Entries on leaderboard
    private entries: Array<Entry>;

    // App Dimensions
    private _appH: number;
    private _appW: number;

    // Dragging Logic things
    private _dragPoint: Point;
    private _dragging: boolean;

    // Scroll contstraints (dont currently work)
    private _minY: number = 0;
    private _maxY: number = 0;

    /** Create a leaderboard full of names
     * 
     * @param names     {Array<string>} Array of names for leaderboard
     * @param appW      {number}        App Width
     * @param appH      {number}        App Height
     */
    constructor(names: Array<string>, appW: number, appH: number){
        super();

        // Create entry for each name
        this.entries = [];

        this._appH = appH;
        this._appW = appW;
        this._maxY = appH;

        // Create entries
        for(let i = 0; i < names.length; i++){
            const entry = this.makeEntry(i, names[i]);
            this.entries.push(entry);
            this.addChild(entry)
        }

        // Configure scrolling logic
        this.interactive = true;
        this._dragPoint = new Point();
        this._dragging = false;

        this.on('pointerdown', this._dragStart.bind(this))
        this.on('pointermove', this._dragMove.bind(this))
        this.on('pointerup', this._dragEnd.bind(this))
    }

    // DRAGGING LOGIC --------------------------------------------------------------
    private _dragStart(e: MouseEvent){
        const mousePoint = new Point(e.x, e.y);
        this._dragPoint = new Point(
            this.x - mousePoint.x, 
            this.y - mousePoint.y
        );

        this._dragging = true;
        this.updateDragPos(mousePoint)
    }

    private _dragMove(e: MouseEvent){
        if(!this._dragging) return;

        const mousePoint = new Point(e.x, e.y);
        this.updateDragPos(mousePoint)
    }

    private _dragEnd(e: MouseEvent){
        if(!this._dragging) return;

        this._dragging = false;
    }

    private updateDragPos(p: Point){
        if(!this._dragging || !this._dragPoint)
            return

        const newPos = p.y + this._dragPoint.y;

        const validMove = newPos > this._minY && newPos < this._maxY;

        this.y = validMove ? newPos : this.y;
    }

    // Leaderboard Logic -----------------------------------------------------------

    /** Make Entry for Leaderboard
     * 
     * @param i     {number}    Iterator from array
     * @param name  {string}    Name of entry
     * @param score {string}    Score for entry 
     * @returns Entry
     */
    private makeEntry(i: number, name: string, score: number = 0){
        const h = this._appH/10;

        const x = Leaderboard.PADDING.h;
        const y = (i*h) + ((i+1)*Leaderboard.PADDING.v);

        this._minY -= h + Leaderboard.PADDING.v;
        this._maxY += h + Leaderboard.PADDING.v;

        return new Entry(
            x, y, this._appW - (Leaderboard.PADDING.h * 2),
            h, name, this, score
        )
    }

    // Sort entries by score in descending order
    public sortEntries(){
        this.entries.sort(function(a, b){return b.score - a.score});
        this.repositionEntries();
    }

    // Redraw entries according to array order
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