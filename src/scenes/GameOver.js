import { Scene } from 'phaser';
import {Utils} from "../Utils.js";

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        let score = this.registry.get('highscore');

        this.add.image(512, 384, 'background');
        this.add.text(512, 300, `Game Over\n\nHigh Score: ${score}`, Utils.textLarge).setAlign('center').setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
