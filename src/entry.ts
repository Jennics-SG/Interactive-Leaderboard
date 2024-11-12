/** Name:   Interactive-leaderboard.entry.ts
 *  Desc:   Entry inside the interactive leaderboard
 *  Author: Jimy Houlbrook 
 *  Date:   12/11/24
 */

import { Container, Graphics, TextStyle, Text } from "pixi.js";
import { Leaderboard } from "./leaderboard";

interface colourData{
    fill: string,
    stroke: string
}

interface Colours{
    first: colourData,
    second: colourData,
    third: colourData,
    rest: colourData
}

export class Entry extends Container{
    public name: string;
    public score: number = 0;

    public static colours : Colours = {
        first: { 
            fill: "#dfbe1a",
            stroke: "#a9c333"
        },
        second: {
            fill: "#5bdf23",
            stroke: "#73c84c"
        },
        third: {
            fill: "#222e50",
            stroke: "#324D5D"
        },
        rest: {
            fill: "#1a33cc",
            stroke: "#111728"
        }
    }

    public static INTERNAL_PADDING: number = 30;

    private _parent: Leaderboard;
    private _cursor: Graphics = new Graphics;
    private _scoreText: Text;
    private _nameText: Text
    private _textStyle: TextStyle = new TextStyle({
        fontFamily: "Arial",
        fontSize: 42,
        fill: "#ffffff",
        align: "center"
    });

    constructor(
        x: number,
        y: number,
        w: number,
        h: number,
        name: string,
        parent: Leaderboard,
        score?: number
    ){
        super();
        
        this.name = name;

        this._parent = parent

        // Set score if one is provided
        this.score = score? score: 0;

        // Add Graphics to container
        this.addChild(this._cursor);

        // Create Graphics background for entry
        this._cursor.roundRect(x, y, w, h, 25);
        this._cursor.fill(Entry.colours.rest.fill);
        this._cursor.stroke({width: 10, color: Entry.colours.rest.stroke});
        
        // Add name to graphics
        this._nameText = new Text({
            text: this.name,
            style: this._textStyle
        });
        this._nameText.anchor.set(0.5);
        this._nameText.position.set((x + Entry.INTERNAL_PADDING) + this._nameText.width / 2, y + h / 2);
        this.addChild(this._nameText);

        // Add score display to right hand side
        this._scoreText = new Text({
            text: this.score,
            style: this._textStyle
        });
        this._scoreText.anchor.set(0.5);
        this._scoreText.position.set((x - Entry.INTERNAL_PADDING) + (w - this._scoreText.width), y + h / 2 );
        this.addChild(this._scoreText);

        // Button for + / - to score
        const minus = this.createButton("-", this._scoreText.x, this._scoreText.y, ()=>{
            this.updateScore(-1);
            parent.sortEntries();
        })
        this.addChild(minus);

        const add = this.createButton("+", this._scoreText.x - 75, this._scoreText.y, ()=> {
            this.updateScore(1);
            parent.sortEntries();
        });
        this.addChild(add)
    }

    createButton(op: string, x: number, y: number, cb: CallableFunction): Container{
        const cont = new Container();
        
        // Graphics cursor for this container
        const cur = new Graphics();

        x-=200;
        y-=25;

        // Create opaque background
        cur.roundRect(x, y, 50, 50);
        cur.fill("#000000");
        cur.alpha = 0.5;
        cont.addChild(cur);
        
        cont.interactive = true;
        cont.on('mouseenter', ()=>cur.alpha=1)
        cont.on('mouseleave', ()=>cur.alpha=0.5)

        // Add op text
        const text = new Text({
            text: op,
            style: this._textStyle
        });
        text.anchor.set(0.5);
        text.position.set(x + 25, y + 25);
        cont.addChild(text);

        // Configure CB
        cont.on('mousedown', ()=>cb());

        return cont;
    }

    // Update Score 
    updateScore(scoreDiff: number){
        this.score += scoreDiff;

        const prevW = this._scoreText.width;

        this._scoreText.text = "";
        this._scoreText.text = this.score;

        // Calculate difference between current width and previous
        // This allows us to remove the diff from the x meaning the text
        // Stays in the same place
        const wDiff = this._scoreText.width - prevW;

        this._scoreText.anchor.set(0.5);
        this._scoreText.x -= wDiff / 2;
    }

    // Update position of container
    updatePosition(x: number, y: number){
        this.position.set(x, y);
    }
}