import Phaser from "phaser";

class title extends Phaser.Scene {
    constructor() {
        super('title');
    }

    preload() {
        
    }

    create() {
        this.add.image(400, 300, 'street');
        this.add.image(400, 300, 'robot');
        this.add.text(400, 300,'Hello World!');
    }
}

export default title;