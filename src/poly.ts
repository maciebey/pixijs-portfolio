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
    neighbors: SpriteWithState[] | null;
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
    currentVisibleTilesX: number = 0;
    currentVisibleTilesY: number = 0;
    activeSpriteAndPosition = {
        sprite: <Sprite>null,
        i: -1,
        j: -1,
    }

    constructor(app: Application) {
        this.pixiApp = app;
        pixiTilerInstance = this;
        this.setupTiles();
    }

    setupTiles() {
        const createHexTexture = (innerColor: number) => createBaseHexagonTexture(
            this.pixiApp, COLORS.BLACK, innerColor
        );

        const btOne = createHexTexture(0x8189B1);
        const btTwo = btOne;
        const btThree = createHexTexture(0x616C9E);
        

        const rowCount = Math.ceil(window.innerHeight / vertDistance) + 2;
        const rowLength = Math.ceil(window.innerWidth / 50) + 1;
        this.currentVisibleTilesX = rowLength;
        this.currentVisibleTilesY = rowCount;
        if (rowCount <= this.activeRowCount && rowLength <= this.activeRowLength) return;
        // initialize sprites
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
            let k = (i % 2 === 0 ? 0 : 2);
            for (let j = 0; j < rowLength; j++) {
                if (!newRow && j < this.activeRowLength) {
                    k = (k + 1) % 3;
                    continue;
                }
                let hexagonSprite: Sprite;
                if (k === 0) {
                    hexagonSprite = Sprite.from(btOne);
                } else if (k === 1) {
                    hexagonSprite = Sprite.from(btTwo);
                } else {
                    hexagonSprite = Sprite.from(btThree);
                }
                k = (k + 1) % 3;
                hexagonSprite.x = j * 50 + (i % 2 === 0 ? -25 : 0);
                hexagonSprite.y = i * Math.floor(vertDistance) - 25;
                hexagonSprite.anchor.x = 0.5;
                hexagonSprite.anchor.y = 0.5;
                hexagonSprite.scale.set(.5, .5);
                const state: spriteState = {
                    name: 'idle',
                    center: {x: hexagonSprite.x, y: hexagonSprite.y},
                    priority: 0,
                    currentAction: null,
                    neighbors: null,
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
        // calculate neighbors
        for (let i = 0; i < this.spriteStateArr.length; i++) {
            const currentRow = this.spriteStateArr[i];
            for (let j = 0; j < currentRow.length; j++) {
                const neighbors = [];
                if (i > 0) {
                    if (i % 2 === 0) {
                        neighbors.push(this.spriteStateArr[i - 1][j]);
                        if (j > 0) {
                            neighbors.push(this.spriteStateArr[i - 1][j - 1]);
                        }
                    }
                    else {
                        neighbors.push(this.spriteStateArr[i - 1][j]);
                        if (j < currentRow.length - 1) {
                            neighbors.push(this.spriteStateArr[i - 1][j + 1]);
                        }
                    }
                }
                if (i < this.spriteStateArr.length - 1) {
                    if (i % 2 === 0) {
                        neighbors.push(this.spriteStateArr[i + 1][j]);
                        if (j > 0) {
                            neighbors.push(this.spriteStateArr[i + 1][j - 1]);
                        }
                    }
                    else {
                        neighbors.push(this.spriteStateArr[i + 1][j]);
                        if (j < currentRow.length - 1) {
                            neighbors.push(this.spriteStateArr[i + 1][j + 1]);
                        }
                    }
                }
                if (j > 0) {
                    neighbors.push(currentRow[j - 1]);
                }
                if (j < currentRow.length - 1) {
                    neighbors.push(currentRow[j + 1]);
                }
                currentRow[j].state.neighbors = neighbors;
            }
        }
        this.activeRowCount = Math.max(rowCount, this.activeRowCount);
        this.activeRowLength = Math.max(rowLength, this.activeRowLength);
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
                        makeResetSizeAndRotationAction(sprite, 0, .1),
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
        const {i: prevI, j: prevJ} = this.activeSpriteAndPosition;
        if (prevI === i && prevJ === j) {
            return;
        }
        // reset the last hover
        if (this.activeSpriteAndPosition.sprite !== null) {
            const ss = this.spriteStateArr[prevI][prevJ];
            this.setSpriteToIdle(ss);
            for (const neighbor of ss.state.neighbors) {
                this.setSpriteToIdle(neighbor)
            }
        }
        const ss = this.spriteStateArr[i][j];
        this.activeSpriteAndPosition.sprite = ss.sprite; 
        this.activeSpriteAndPosition.i = i;
        this.activeSpriteAndPosition.j = j;
        this.setSpriteToHover(ss);
        for (const neighbor of ss.state.neighbors) {
            this.setSpriteToNeighbor(neighbor)
        }
    }

    setSpriteToIdle = (ss: SpriteWithState) => {
        const {sprite, state} = ss;
        state.name = 'idle';
        state.priority = 0;
        sprite.zIndex = 0;
        if (state.currentAction !== null) {
            state.currentAction.stop();
        }
        state.currentAction = Actions.sequence(
            makeResetSizeAndRotationAction(sprite, .1, .1),
        ).play();
    }

    setSpriteToHover = (ss: SpriteWithState) => {
        const {sprite, state} = ss;
        state.name = 'hover';
        state.priority = 1;
        sprite.zIndex = 100;
        if (state.currentAction !== null) {
            state.currentAction.stop();
        }
        state.currentAction = Actions.sequence(
            Actions.scaleTo(sprite, .7, .7, .1, Interpolations.linear),
        ).play();
    }

    setSpriteToNeighbor = (ss: SpriteWithState) => {
        const {sprite, state} = ss;
        state.name = 'neighbor';
        state.priority = 1;
        sprite.zIndex = 99;
        if (state.currentAction !== null) {
            state.currentAction.stop();
        }
        state.currentAction = Actions.sequence(
            Actions.scaleTo(sprite, .6, .6, .1, Interpolations.linear),
        ).play();
    }
}

export default PixiTiler;
export {
    getTilerInstance
};
