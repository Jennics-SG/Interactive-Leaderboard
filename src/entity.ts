/** Name:   Interactive-Leaderboard.entity.ts
 *  Desc:   Entity for parallax
 *  Author: Jimy Houlbrook
 *  Date:   11/11/24
 */

import { Container, Graphics } from "pixi.js";

export class Entity extends Container {
    // Graphics cursor
    private _cursor: Graphics

    public speedMultiplier: number;

    /** Create an entity of w/h at x/y
     * 
     * @param x     {number}    X Position
     * @param y     {number}    Y Position
     * @param w     {number}    Width
     * @param h     {number}    Height
     */
    constructor(x: number, y: number, w: number, h: number){
        super();

        this._cursor = new Graphics;
        
        // Draw Rectangle
        this._cursor.rect(x-w/2, y-h/2, w, h,);
        this._cursor.fill("#ffffff");
        
        // Add grapics
        this.addChild(this._cursor);

        this.speedMultiplier = Math.random() * 2;
    }

    // Regenerate random speed multiplier
    regenSpeed(){
        this.speedMultiplier = Math.random() * 2;
    }

    // Move entity to x,y
    moveTo(x: number, y: number){
        this.position.set(x, y);
    }
}