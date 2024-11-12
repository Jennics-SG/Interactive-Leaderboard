/** Name:   Interactive-Leaderboard.main.ts
 *  Desc:   Main file, Creates Interactive Leaderboard, Populates names
 *  Author: Jimy Houlbrook  
 *  Date:   11/11/24 
 */

import { Application } from 'pixi.js';

import { Parallax } from './parallax';
import { Leaderboard } from './leaderboard';

// Container to hold Application
class AppContainer{

    // PIXI Application
    private app: Application;

    // Array of names in leaderBoard
    private names: Array<string>

    // Initialse static properties
    constructor(){
        this.app = new Application;
        
        this.names = [
            "test",
            "test",
            "test",
            "test",
        ]
        
        this.init();
    }

    // Initialise application
    async init(){
        // Load PIXI Application
        await this.app.init({
            width: window.innerWidth,
            height: window.innerHeight,
            canvas: <HTMLCanvasElement>document.getElementById("app"),
            background: "0x000000",
            antialias: true,
            resizeTo: window,
        });

        // Create Parallax Backround
        const parallax = new Parallax(this.app.canvas.width, this.app.canvas.height);
        this.app.stage.addChild(parallax);
        this.app.ticker.add(parallax.update.bind(parallax));

        // Create Leaderboard
        const leaderboard = new Leaderboard(this.names, this.app.canvas.width, this.app.canvas.height);
        this.app.stage.addChild(leaderboard);
    }
}

document.addEventListener("DOMContentLoaded", _=> new AppContainer);