
import { Action, Actions, Interpolations } from 'pixi-actions';

import {createPixiApplication} from './pixiSetup';
import PixiTiler from './poly';
import { startReact } from './content';

const SHAKER = true;
const DEMO_BACKGROUND = false;

startReact();

// pixi.js setup
const pixiApp = createPixiApplication('pixi-container')
// start frame updates
pixiApp.ticker.add((delta) => {
    Actions.tick(delta/60)
});

// create tiling background
const pt = new PixiTiler(pixiApp);

// window listeners
window.onload = () => {
    // call again for adding more tiles
    window.onresize = () => {
        pt.setupTiles();
    }

    let currentStageAction: Action;
    window.onmousemove = (event) => {
        const halfWidth = window.innerWidth / 2;
        const shiftX = 10 * (event.clientX - halfWidth) / halfWidth;
        const halfHeight = window.innerHeight / 2;
        const shiftY = 10 * (event.clientY - halfHeight) / halfHeight;
        if ( pixiApp.stage.x !== shiftX || pixiApp.stage.y !== shiftY) {
            if (currentStageAction) {
                currentStageAction.stop();
            }
            currentStageAction = Actions.sequence(
                Actions.moveTo(pixiApp.stage, shiftX, shiftY, .1, Interpolations.linear)
            ).play();
        }
    }

    if (SHAKER) {
        let shakeInterval: NodeJS.Timeout | null;
        shakeInterval = (document.visibilityState === 'hidden') ? null :
            setInterval(() => {
                pt.shakeRandom();
            }, 1000);
        document.addEventListener("visibilitychange", (ev)=>{
            if (document.visibilityState === 'visible') {
                shakeInterval = setInterval(() => {
                    pt.shakeRandom();
                }, 1000);
            } else if (shakeInterval !== null) {
                clearInterval(shakeInterval);
            }
        });
    }
    if (DEMO_BACKGROUND) {
        setInterval(() => {
            pt.activateRunner();
        }, 5000);
    }
}
