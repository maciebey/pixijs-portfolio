
import { Action, Actions, Interpolations } from 'pixi-actions';

import {createPixiApplication} from './pixiSetup';
import { setupTile, activateRunner, shakeRandom } from './poly';
import { startReact } from './content';

const DEMO_BACKGROUND = false;

startReact();

// pixi.js setup
const pixiApp = createPixiApplication('pixi-container')
// start frame updates
pixiApp.ticker.add((delta) => {
    Actions.tick(delta/60)
});

// create tiling background
setupTile(pixiApp);

// window listeners and listeners
window.onload = () => {
    // call again for adding more tiles
    window.onresize = () => {
        setupTile(pixiApp);
    }

    let currentStageAction: Action;
    window.onmousemove = (event) => {
        console.log(event.clientX, event.clientY)
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

    // button listeners
    // document.getElementById("runner-button").onclick = (event) => {
    //     activateRunner();
    // }
    // document.getElementById("shaker-button").onclick = (event) => {
    //     shakeRandom();
    // }

    if (DEMO_BACKGROUND) {
        setInterval(() => {
            activateRunner();
        }, 5000);
    }
}
