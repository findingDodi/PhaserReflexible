import { Scene } from 'phaser';
import {Utils} from "../Utils.js";

export class MainMenu extends Scene {
    
    score = 0;
    instructions = [];
    
    constructor() {
        super('MainMenu');
    }

    create() {
        this.score = this.registry.get('highscore');
        this.instructions = [
            'Reflexion',
            'How many coins can you',
            'click in 20 seconds?',
            '',
            'Click to Start!'
        ];

        this.add.image(512, 384, 'background');
        this.add.text(32, 32, `High Score: ${this.score}`, Utils.textMedium);
        this.add.text(512, 350, this.instructions, Utils.textMedium).setAlign('center').setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('ClickerGame');

        });
    }
}
