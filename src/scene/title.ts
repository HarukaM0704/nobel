import Phaser from "phaser";

class title extends Phaser.Scene {
    constructor() {
        super('title');
    }

    init(){
        this.cameras.main.fadeIn(1000, 255, 255, 255);    //時間、R,G,B
    }

    create() {

        let win = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        console.log('width:'+ window.innerWidth+ '  height:' + window.innerHeight);

        const fit = () => {            
            if(window.innerHeight>window.innerWidth){
                if(win.height<window.innerHeight){
                    this.game.scale.displaySize.setAspectRatio( window.innerHeight/window.innerWidth );
                }
                this.cameras.main.setRotation(Math.PI * 0.5);
                
            } else {
                if(win.width<window.innerWidth){
                    this.game.scale.displaySize.setAspectRatio( window.innerWidth/window.innerHeight );
                }
                this.cameras.main.setRotation(0);
            }
        }

        //let clicktext;

        //this.cameras.main.fadeIn(1000, 0, 0, 0);    //時間、R,G,B

        const back = this.add.image(window.innerWidth/2, window.innerHeight/2, 'title');
        const robot = this.add.image(window.innerWidth/2, window.innerHeight/2, 'robot');
        //robot.setInteractive({
        //    useHandCursor: true
        //});
        //this.add.text(width/2, height/2,'Hello World!');

        const container = this.add.container(innerWidth/2,innerHeight/2).setSize(back.width,back.height);
        
        const playbtn = this.add.rectangle(-back.width/3,back.height/4,200,100,0xffffff);
        playbtn.setInteractive({
            useHandCursor: true
        });

        const howtobtn = this.add.rectangle(back.width/3,back.height/4,200,100,0xffffff);
        howtobtn.setInteractive({
            useHandCursor: true
        });

        container.add([playbtn, howtobtn]);

        playbtn.on('pointerdown', () => {
            this.scene.start('play');
        })

        howtobtn.on('pointerdown', () => {
            this.scene.launch('test')
        })

        fit();

        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            back.setPosition(window.innerWidth/2,window.innerHeight/2);
            robot.setPosition(window.innerWidth/2,window.innerHeight/2);
            container.setPosition(window.innerWidth/2,window.innerHeight/2);

            fit();
            win.height=window.innerHeight;
            win.width=window.innerWidth;

        });
        
        
 
    }
}




export default title;
