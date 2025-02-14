import Phaser from "phaser";

class test extends Phaser.Scene {
    constructor(){
        super('test');
    }

    create() {

        const pages = 3;
        var currentpage = 1;

        const {width, height} = this.sys.game.canvas;

        const back = this.add.rectangle(width/2,height/2,width,height,0x000000,0.5);
        back.setInteractive({
            useHandCursor: true
        })

        const content = this.add.rectangle(width/2,height/2,600,400,0xffffff);
        content.setInteractive({
            userHandCursor: false
        })

        const prev = this.add.rectangle(380,height/2,50,50,0x000000);
        prev.setInteractive({
            userHandCursor:true
        })

        const next = this.add.rectangle(880,height/2,50,50,0x000000);
        next.setInteractive({
            userHandCursor: true
        })

        contentvisible();


        
        back.on('pointerdown', () => {
            this.scene.sleep();
        })

        prev.on('pointerdown', () => {
          currentpage -= 1;
          contentvisible();  
        })

        next.on('pointerdown', () => {
            currentpage += 1;
            contentvisible();
        })


        function contentvisible() {
            if(currentpage==1) {
                prev.setVisible(false);
                next.setVisible(true);
            }  
            else if(currentpage===pages) {
                prev.setVisible(true);
                next.setVisible(false);
            } else {
                prev.setVisible(true);
                next.setVisible(true);
            }
        }

    }
}

export default test;