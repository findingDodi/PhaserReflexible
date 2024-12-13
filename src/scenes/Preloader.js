import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.add.image(512, 384, 'preloader');
    }

    preload() {
        this.load.setPath('assets');

        this.load.image('background', 'background.png');
        this.load.image('target', 'target.png');
    }

    create() {
        //  When all the assets are loaded go to the next scene with a transition
        this.scene.transition({
            target: 'MainMenu',
            duration: 1000,
            moveBelow: true,
            onUpdate: (progress) => {
                this.cameras.main.setAlpha(1 - progress);
            }
        });
    }
}
