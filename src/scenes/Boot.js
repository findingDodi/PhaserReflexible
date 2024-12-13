import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        this.load.image('preloader', 'assets/preloader.png');
    }

    create() {
        //  A global value to store the highscore in
        this.registry.set('highscore', 0);

        this.scene.start('Preloader');
    }
}
