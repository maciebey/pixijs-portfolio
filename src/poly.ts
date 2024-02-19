import { Application, Graphics, Sprite } from 'pixi.js';
import { Action, Actions, Interpolations } from 'pixi-actions';
import '@pixi/graphics-extras';

import { vertDistance } from './config';

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
const spriteStateArr: SpriteWithState[][] = [];

let activeRowLength = 0;
let activeRowCount = 0;

const createBaseTexture = (app: Application, j:number = 0) => {
    const width = 100;
    const hexR = (width / 2) / Math.cos(30 * Math.PI / 180);
    const innerHexR = ((width/ 2) - 2)  / Math.cos(30 * Math.PI / 180);
    const graphic = new Graphics();
    graphic.beginFill(0x000000);
    graphic.drawRegularPolygon(0, 0, hexR, 6);
    graphic.endFill();
    if (j === 0) {
        graphic.beginFill(0xD6D6D6);
    } else {
        graphic.beginFill(0xDE3249);
    }
    graphic.drawRegularPolygon(0, 0, innerHexR, 6);
    const texture = app.renderer.generateTexture(graphic)
    return texture;
}

const setupTile = (app: Application) => {
    const baseTexture = createBaseTexture(app);
    const rowCount = Math.ceil(window.innerHeight / vertDistance) + 2;
    const rowLength = Math.ceil(window.innerWidth / 50) + 1;
    if (rowCount <= activeRowCount && rowLength <= activeRowLength) return;
    for (let i = 0; i < rowCount; i++) {
        let row: SpriteWithState[];
        let newRow = true;
        if (i < activeRowCount) {
            row = spriteStateArr[i];
            newRow = false;
        } else {
            row = [];
            spriteStateArr.push(row);
        }
        for (let j = 0; j < rowLength; j++) {
            if (!newRow && j < activeRowLength) continue;
            var hexagonSprite = Sprite.from(baseTexture)
            hexagonSprite.x = j * 50 + (i % 2 === 0 ? -25 : 0);
            hexagonSprite.y = i * vertDistance - 25;
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
            app.stage.addChild(hexagonSprite)
            hexagonSprite.on('mouseenter', (event: any ) => {
                updateHover(i, j);
                // console.log(i, j)
                // console.log(hexagonSprite.x, hexagonSprite.y, event)
            });
            hexagonSprite.eventMode = 'static';
        }
    }
    activeRowCount = rowCount;
    activeRowLength = rowLength;
}

const activateRunner = () => {
    for (let i=0; i<spriteStateArr[0].length; i++) {
        for (let j=0; j<spriteStateArr.length; j++) {
            const {sprite, state} = spriteStateArr[j][i];
            setTimeout(() => {
                Actions.sequence(
                    Actions.scaleTo(sprite,    .4,   .4, .2, Interpolations.linear),
                    Actions.scaleTo(sprite,    .6,   .6, .2, Interpolations.linear),
                    Actions.scaleTo(sprite,    .5,   .5, .2, Interpolations.linear),
                    // Actions.runFunc(()=>{
                    //     state.name = 'idle';
                    //     state.priority = 0;
                    //     updateHover
                    // })
                ).play();
            }, (i * 10) + ( j * 50));
        }
    }
}

const activeSpriteAndPosition = {
    sprite: <Sprite>null,
    i: -1,
    j: -1
};
const updateHover = (i: number, j: number) => {
    const {sprite, state} = spriteStateArr[i][j];
    if (activeSpriteAndPosition.i === i && activeSpriteAndPosition.j === j) {
        return;
    }
    if (activeSpriteAndPosition.sprite !== null) {
        const {sprite: prevSprite, i, j} = activeSpriteAndPosition;
        const {state: prevState} = spriteStateArr[i][j];
        prevState.name = 'idle';
        prevState.priority = 0;
        prevSprite.zIndex = 0;
        if (prevState.currentAction !== null) {
            prevState.currentAction.stop();
        }
        prevState.currentAction = Actions.sequence(
            Actions.scaleTo(prevSprite, .5, .5, .1, Interpolations.linear),
        ).play();
    }
    activeSpriteAndPosition.sprite = sprite; 
    activeSpriteAndPosition.i = i;
    activeSpriteAndPosition.j = j;
    state.name = 'hover';
    state.priority = 1;
    sprite.zIndex = 100;
    state.currentAction = Actions.sequence(
        Actions.scaleTo(sprite, .7, .7, .1, Interpolations.linear),
        // Actions.tintTo(graphics, 0x00FF00, .1, Interpolations.linear),
    ).play();
}

export {
    setupTile,
    activateRunner,
    updateHover
};