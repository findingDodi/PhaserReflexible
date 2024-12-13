import { Scene } from 'phaser';
import {Utils} from "../Utils.js";

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        const score = this.registry.get('highscore');

        this.add.image(512, 384, 'background');
        
        this.add.text(32, 32, `High Score: ${score}`, Utils.textMedium);

        const instructions = [
            'Reflexion',
            'How many coins can you',
            'click in 10 seconds?',
            '',
            'Click to Start!'
        ]

        this.add.text(512, 350, instructions, Utils.textMedium).setAlign('center').setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('ClickerGame');

        });
    }
}
