/** Name:   Interactive-Leaderboard.main.ts
 *  Desc:   Main file, Creates Interactive Leaderboard, Populates names
 *  Author: Jimy Houlbrook  
 *  Date:   11/11/24 
 */

import { Application } from 'pixi.js';

import { Parallax } from './parallax';

class AppContainer{
    private app: Application;
    constructor(){
        this.app = new Application;
        this.init();
    }

    async init(){
        // Load PIXI Application
        await this.app.init({
            width: window.innerWidth,
            height: window.innerHeight,
            canvas: <HTMLCanvasElement>document.getElementById("app"),
            background: "0x000000",
            antialias: true,
            resizeTo: window,
            hello: true,
        });

        // Create Parallax Backround
        const parallax = new Parallax(this.app.canvas.width, this.app.canvas.height);
        this.app.stage.addChild(parallax);
        this.app.ticker.add(parallax.update.bind(parallax));
    }
}

document.addEventListener("DOMContentLoaded", _=> new AppContainer);