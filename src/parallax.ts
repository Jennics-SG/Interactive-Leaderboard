/** Name:   Interactive-Leaderboard.parallax.ts
 *  Desc:   Parallax Background for Interactive-Leaderboard
 *  Author: Jimy Houlbrook
 *  Date:   11/11/2024
 */

import { Container, Graphics, Point } from "pixi.js";

import { Entity } from "./entity";

export class Parallax extends Container{

    // Array of current entities
    private _entities: Array<Entity>

    // Application Dimensions
    private _appW: number;
    private _appH: number;

    constructor(w: number, h: number){
        super();
        this._entities = [];
        this._appW = w;
        this._appH = h;

        // Create 200 entities
        for(let i = 0; i <= 200; i++){
            this.createEntity();
        }
    }

    // Generate Entity Dimensions given min/max x/y values
    generateEntityDims(): {x: number, y: number, w: number, h: number}{
        const minY = this._appH;
        const maxY = minY + (this._appH / 10);
        const minX = 0;
        const maxX = this._appW;

        return {
            x: this.generateNumInRange(minX, maxX),
            y: this.generateNumInRange(minY, maxY),
            w: this.generateNumInRange(5, 15),
            h: this.generateNumInRange(5, 15)
        }
    }

    // Generate random number in range
    generateNumInRange(min: number, max: number): number{
        const num = Math.random();
        return max + (min - max) * num;
    }

    // Create an entity and add to parallax
    createEntity(){
        const {x, y, w, h} = this.generateEntityDims();
        const entity = new Entity(0-w/2, 0-h/2, w, h);
        this.addChild(entity);
        this._entities.push(entity);
    }

    // Update loop, runs every frame
    public update(){
        for(const entity of this._entities){
            entity.position.y -= 2.5 * entity.speedMultiplier;
            // console.log(entity.position);
            if(entity.position.y + entity.height / 2 <= 0){
                const {x, y} = this.generateEntityDims();
                entity.moveTo(x, y);
                entity.regenSpeed();
            }
        }
    }
}