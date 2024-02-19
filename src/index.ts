
import { Actions } from 'pixi-actions';

import {createPixiApplication} from './pixiSetup';
import { setupTile, activateRunner } from './poly';
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

    // button listeners
    document.getElementById("runner-button").onclick = (event) => {
        activateRunner();
    }

    if (DEMO_BACKGROUND) {
        setInterval(() => {
            activateRunner();
        }, 5000);
    }
}
