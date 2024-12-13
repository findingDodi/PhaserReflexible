import { Scene } from 'phaser';
import {Utils} from "../Utils.js";

export class ClickerGame extends Scene {
    
    score = 0;
    coins = [];
    scoreText = null;
    timeText = null;
    timer = null;
    
    constructor() {
        super('ClickerGame');
    }

    create() {
        this.add.image(512, 384, 'background');

        this.scoreText = this.add.text(32, 32, 'Coins: 0', Utils.textMedium).setDepth(1);
        this.timeText = this.add.text(1024 - 32, 32, 'Time: 10', Utils.textMedium).setOrigin(1, 0).setDepth(1);

        //  10-second timer starts automatically 
        this.timer = this.time.addEvent({ 
            delay: 10000, 
            callback: () => this.gameOver() 
        });

        this.physics.world.setBounds(0, -400, 1024, 768 + 310);

        for (let i = 0; i < 32; i++) {
            this.dropCoin();
        }

        this.input.on('gameobjectdown', (pointer, gameObject) => this.clickCoin(gameObject));
    }

    dropCoin() {
        let x = Phaser.Math.Between(128, 896);
        let y = Phaser.Math.Between(0, -400);
        let coin = this.physics.add.sprite(x, y, 'coin').play('rotate');

        coin.setVelocityX(Phaser.Math.Between(-400, 400));
        coin.setCollideWorldBounds(true);
        coin.setBounce(0.9);
        coin.setInteractive();

        this.coins.push(coin);
    }

    clickCoin(coin) {
        coin.disableInteractive();
        coin.setVelocity(0, 0);
        coin.play('vanish');
        coin.once('animationcomplete-vanish', () => coin.destroy());
        
        this.score++;
        this.scoreText.setText('Coins: ' + this.score);
        
        this.dropCoin();
    }

    update() {
        this.timeText.setText('Time: ' + Math.ceil(this.timer.getRemainingSeconds()));
    }

    gameOver() {
        this.coins.forEach((coin) => {
            if (coin.active) {
                coin.setVelocity(0, 0);
                coin.play('vanish');
            }
        });

        this.input.off('gameobjectdown');
        
        let highscore = this.registry.get('highscore');

        if (this.score > highscore) {
            this.registry.set('highscore', this.score);
        }
        
        this.time.delayedCall(2000, () => this.scene.start('GameOver'));
    }
}
