import Phaser from "phaser";

class test extends Phaser.Scene {
    constructor(){
        super('test');
    }

    create() {
        const testtext = this.add.text(400,200,'testtesttest', {fontSize: '60px'});
        testtext.setInteractive({
            useHandCursor: true
        })
        testtext.on('pointerdown', () => {
            this.scene.start('title');
        })
    }
}

export default test;