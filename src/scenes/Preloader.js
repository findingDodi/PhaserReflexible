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
        this.load.image('logo', 'cc-logo.png');
        this.load.atlas('coin', 'coin.png', 'coin.json');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        
        this.anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNames('coin', { prefix: 'coin_', start: 1, end: 7, zeroPad: 2 }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'vanish',
            frames: this.anims.generateFrameNames('coin', { prefix: 'vanish_', start: 1, end: 4 }),
            frameRate: 10
        });

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
