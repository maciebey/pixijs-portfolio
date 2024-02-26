import { Application, Graphics, Sprite } from "pixi.js";
import { Actions, Interpolations } from 'pixi-actions';

// min and max included 
const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// create a hexagon texture with a border
const createBaseHexagonTexture = (app: Application, color01: number, color02: number) => {
    const width = 100;
    const hexR = ((width / 2) + 1) / Math.cos(30 * Math.PI / 180);
    const innerHexR = ((width / 2) - 2)  / Math.cos(30 * Math.PI / 180);
    const graphic = new Graphics();
    graphic.beginFill(color01);
    graphic.drawRegularPolygon(0, 0, hexR, 6);
    graphic.endFill();
    graphic.beginFill(color02);
    graphic.drawRegularPolygon(0, 0, innerHexR, 6);
    graphic.endFill();
    const texture = app.renderer.generateTexture(graphic)
    return texture;
}

const makeShakeAction = (sprite: Sprite) => {
    return Actions.sequence(
        Actions.rotateTo(
            sprite,
            (30 * Math.PI / 180),
            .4,
            Interpolations.smooth
        ),
        Actions.rotateTo(
            sprite,
            0 - (60 * Math.PI / 180),
            .4,
            Interpolations.smooth
        ),
    );
}
const makeResetSizeAndRotationAction = (
    sprite: Sprite,
    rotationTime: number = 0,
    scaleTime: number = 0
) => {
    return Actions.parallel(
        Actions.rotateTo(
            sprite,
            0,
            rotationTime,
            Interpolations.smooth
        ),
        Actions.scaleTo(
            sprite,
            .5,
            .5,
            scaleTime,
            Interpolations.smooth
        ),
    );
}

export {
    randomIntFromInterval,
    createBaseHexagonTexture,
    makeShakeAction,
    makeResetSizeAndRotationAction,
}
