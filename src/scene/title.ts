import Phaser from "phaser";

class title extends Phaser.Scene {
    constructor() {
        super('title');
    }

    create() {

        const {width, height} = this.sys.game.canvas;

        //let clicktext;

        //this.cameras.main.fadeIn(1000, 0, 0, 0);    //時間、R,G,B

        this.add.image(width/2, height/2, 'title');
        const robot = this.add.image(width/2, height/2, 'robot');
        robot.setInteractive({
            useHandCursor: true
        });
        //this.add.text(width/2, height/2,'Hello World!');

        robot.on('pointerdown', () => {
            //clicktext = this.add.text(200,400,'Click!!!!', {fontSize: '60px'});
            //clicktext.setInteractive({
            //    useHandCursor: true
            //});
            //this.add.dom(width/2, height/2, howtoplay);
            this.scene.launch('test');
        })

 
    }
}

export default title;