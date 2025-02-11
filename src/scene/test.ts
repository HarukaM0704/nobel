import Phaser from "phaser";

class test extends Phaser.Scene {
    constructor(){
        super('test');
    }

    create() {

        const {width, height} = this.sys.game.canvas;

        const back = this.add.rectangle(width/2,height/2,width,height,0x000000,0.5);
        back.setInteractive({
            useHandCursor: true
        })

        const content = this.add.rectangle(width/2,height/2,600,400,0xffffff);
        content.setInteractive({
            userHandCursor: true
        })

        const testtext = this.add.text(400,200,'testtesttest', {fontSize: '60px', color:'000000'});
        testtext.setInteractive({
            useHandCursor: true
        })

        
        back.on('pointerdown', () => {
            this.scene.sleep();
        })
    }
}

export default test;