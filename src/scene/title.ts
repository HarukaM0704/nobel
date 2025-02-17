import Phaser from "phaser";

class title extends Phaser.Scene {
    constructor() {
        super('title');
    }

    init(){
        this.cameras.main.fadeIn(1000, 255, 255, 255);    //時間、R,G,B
    }

    create() {

        //let clicktext;

        //this.cameras.main.fadeIn(1000, 0, 0, 0);    //時間、R,G,B

        const back = this.add.image(window.innerWidth/2, window.innerHeight/2, 'title');
        const robot = this.add.image(window.innerWidth/2, window.innerHeight/2, 'robot');
        //robot.setInteractive({
        //    useHandCursor: true
        //});
        //this.add.text(width/2, height/2,'Hello World!');
        
        const playbtn = this.add.rectangle(back.width*0.5,back.height/4*3,200,100,0xffffff);
        playbtn.setInteractive({
            useHandCursor: true
        });

        const howtobtn = this.add.rectangle(back.width*1.1,back.height/4*3,200,100,0xffffff);
        howtobtn.setInteractive({
            useHandCursor: true
        });

        playbtn.on('pointerdown', () => {
            this.scene.start('play');
        })

        howtobtn.on('pointerdown', () => {
            this.scene.launch('test')
        })

        robot.on('pointerdown', () => {
            //clicktext = this.add.text(200,400,'Click!!!!', {fontSize: '60px'});
            //clicktext.setInteractive({
            //    useHandCursor: true
            //});
            //this.add.dom(width/2, height/2, howtoplay);
            this.scene.launch('test');
        })

        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            back.setPosition(window.innerWidth/2,window.innerHeight/2);
            robot.setPosition(window.innerWidth/2,window.innerHeight/2);
        });
 
    }
}

export default title;