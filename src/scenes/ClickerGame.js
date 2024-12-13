import { Scene } from 'phaser';
import {Utils} from "../Utils.js";

export class ClickerGame extends Scene {
    
    score = 0;
    targets = [];
    scoreText = null;
    timeText = null;
    timer = null;
    targetScale = 0;
    
    constructor() {
        super('ClickerGame');
    }

    create() {
        this.add.image(512, 384, 'background');

        this.scoreText = this.add.text(32, 32, 'Targets: 0', Utils.textMedium).setDepth(1);
        this.timeText = this.add.text(1024 - 32, 32, 'Time: 10', Utils.textMedium).setOrigin(1, 0).setDepth(1);
        
        this.targetScale = 1;
        this.score = 0;
        this.targets = [];

        //  10-second timer starts automatically 
        this.timer = this.time.addEvent({ 
            delay: 20000, 
            callback: () => this.gameOver() 
        });

        this.physics.world.setBounds(0, -400, 1024, 768 + 310);
        
        this.dropTarget();

        this.input.on('gameobjectdown', (pointer, gameObject) => this.clickTarget(gameObject));
    }

    dropTarget() {
        let x = Phaser.Math.Between(128, 896);
        let y = Phaser.Math.Between(0, -400);
        let target = this.physics.add.sprite(x, y, 'target');
        target.setScale(this.getTargetScale());
        //this.targetScale -= 0.5; 

        target.setVelocityX(Phaser.Math.Between(-400, 400));
        target.setCollideWorldBounds(true);
        target.setBounce(0.9);
        target.setInteractive();

        this.targets.push(target);
    }

    clickTarget(target) {
        target.disableInteractive();
        target.setVelocity(0, 0);
        target.destroy();
        
        this.score++;
        this.scoreText.setText('Targets: ' + this.score);
        
        this.dropTarget();
    }
    
    getTargetScale() {
        let targetScale = this.targetScale - (this.score / 5);
        return Math.max(targetScale, 0.08);
    }

    update() {
        this.timeText.setText('Time: ' + Math.ceil(this.timer.getRemainingSeconds()));
    }

    gameOver() {
        this.targets.forEach((targets) => {
            if (targets.active) {
                targets.setVelocity(0, 0);
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
