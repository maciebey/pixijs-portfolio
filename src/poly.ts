import { Application, Graphics, Sprite } from 'pixi.js';
import { Action, Actions, Interpolations } from 'pixi-actions';
import '@pixi/graphics-extras';

import { vertDistance, COLORS } from './config';
import {
    randomIntFromInterval,
    createBaseHexagonTexture,
    makeShakeAction,
    makeResetSizeAndRotationAction,
} from './util';

interface spriteState {
    name: string;
    center: {x: number, y: number};
    priority: number;
    currentAction: Action;
}
interface SpriteWithState {
    sprite: Sprite;
    state: spriteState;
}

// Singleton instance, temp solution for now so
// can call methods from React components
let pixiTilerInstance: PixiTiler;
const getTilerInstance = () => {
    if (!pixiTilerInstance) {
        throw new Error('PixiTiler not initialized');
    }
    return pixiTilerInstance;
}

class PixiTiler {
    pixiApp: Application;
    spriteStateArr: SpriteWithState[][] = [];
    activeRowCount: number = 0;
    activeRowLength: number = 0;
    activeSpriteAndPosition = {
        sprite: <Sprite>null,
        i: -1,
        j: -1
    }

    constructor(app: Application) {
        this.pixiApp = app;
        pixiTilerInstance = this;
        this.setupTiles();
    }

    setupTiles() {
        const baseTexture = createBaseHexagonTexture(this.pixiApp, COLORS.THREE, COLORS.GRAYWHITE);
        const rowCount = Math.ceil(window.innerHeight / vertDistance) + 2;
        const rowLength = Math.ceil(window.innerWidth / 50) + 1;
        if (rowCount <= this.activeRowCount && rowLength <= this.activeRowLength) return;
        for (let i = 0; i < rowCount; i++) {
            let row: SpriteWithState[];
            let newRow = true;
            if (i < this.activeRowCount) {
                row = this.spriteStateArr[i];
                newRow = false;
            } else {
                row = [];
                this.spriteStateArr.push(row);
            }
            for (let j = 0; j < rowLength; j++) {
                if (!newRow && j < this.activeRowLength) continue;
                var hexagonSprite = Sprite.from(baseTexture)
                hexagonSprite.x = j * 50 + (i % 2 === 0 ? -25 : 0);
                hexagonSprite.y = i * Math.floor(vertDistance) - 25;
                hexagonSprite.anchor.x = 0.5;
                hexagonSprite.anchor.y = 0.5;
                hexagonSprite.scale.set(.5, .5);
                const state: spriteState = {
                    name: 'idle',
                    center: {x: hexagonSprite.x, y: hexagonSprite.y},
                    priority: 0,
                    currentAction: null
                }
                row.push({sprite: hexagonSprite, state});
                this.pixiApp.stage.addChild(hexagonSprite)
                hexagonSprite.on('mouseenter', (event: any ) => {
                    this.updateHover(i, j);
                    // console.log(i, j)
                    // console.log(hexagonSprite.x, hexagonSprite.y, event)
                });
                hexagonSprite.eventMode = 'static';
            }
        }
        this.activeRowCount = rowCount;
        this.activeRowLength = rowLength;
    }
    
    activateRunner() {
        for (let i=0; i<this.spriteStateArr[0].length; i++) {
            for (let j=0; j<this.spriteStateArr.length; j++) {
                const {sprite, state} = this.spriteStateArr[j][i];
                setTimeout(() => {
                    Actions.sequence(
                        Actions.scaleTo(sprite,    .4,   .4, .1, Interpolations.linear),
                        Actions.rotateTo(
                            sprite,
                            0,
                            0
                        ),
                        Actions.rotateTo(
                            sprite,
                            (60 * Math.PI / 180),
                            .2,
                            Interpolations.linear
                        ),
                        Actions.scaleTo(sprite,    .5,   .5, .1, Interpolations.linear),
                    ).play();
                }, (i * 5) + ( j * 50));
            }
        }
    }

    shakeRandom() {
        const i = randomIntFromInterval(1, this.activeRowCount);
        const j = randomIntFromInterval(1, this.activeRowLength);
    
        const {sprite, state} = this.spriteStateArr[i - 1][j - 1];
        if (state.name === 'hover') {
            return;
        }
        if (state.currentAction !== null) {
            state.currentAction.stop();
        }
    
        state.currentAction = Actions.sequence(
            Actions.sequence(
                Actions.scaleTo(sprite,    .45,   .45, .1, Interpolations.linear),
                makeShakeAction(sprite),
                makeShakeAction(sprite),
                makeShakeAction(sprite),
                makeResetSizeAndRotationAction(sprite, 0, .1),
            )
        ).play();
    }

    updateHover = (i: number, j: number) => {
        const {sprite, state} = this.spriteStateArr[i][j];
        if (this.activeSpriteAndPosition.i === i && this.activeSpriteAndPosition.j === j) {
            return;
        }
        if (this.activeSpriteAndPosition.sprite !== null) {
            const {sprite: prevSprite, i: prevI, j: prevJ} = this.activeSpriteAndPosition;
            const {state: prevState} = this.spriteStateArr[prevI][prevJ];
            prevState.name = 'idle';
            prevState.priority = 0;
            prevSprite.zIndex = 0;
            if (prevState.currentAction !== null) {
                prevState.currentAction.stop();
            }
            prevState.currentAction = Actions.sequence(
                makeResetSizeAndRotationAction(prevSprite, .1, .1),
            ).play();
        }
        this.activeSpriteAndPosition.sprite = sprite; 
        this.activeSpriteAndPosition.i = i;
        this.activeSpriteAndPosition.j = j;
        state.name = 'hover';
        state.priority = 1;
        sprite.zIndex = 100;
        if (state.currentAction !== null) {
            state.currentAction.stop();
        }
        state.currentAction = Actions.sequence(
            Actions.scaleTo(sprite, .7, .7, .1, Interpolations.linear),
            // Actions.tintTo(graphics, 0x00FF00, .1, Interpolations.linear),
        ).play();
    }
}

export default PixiTiler;
export {
    getTilerInstance
};
