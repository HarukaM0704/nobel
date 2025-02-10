import Phaser from "phaser";

class title extends Phaser.Scene {
    constructor() {
        super('title');
    }

    preload() {
        
    }

    create() {

        const {width, height} = this.sys.game.canvas;

        this.cameras.main.fadeIn(1000, 0, 0, 0);    //時間、R,G,B

        this.add.image(width/2, height/2, 'title');
        this.add.image(width/2, height/2, 'robot');
        this.add.text(width/2, height/2,'Hello World!');
    }
}

export default title;