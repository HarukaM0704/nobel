import Phaser from "phaser";

class play extends Phaser.Scene {
    constructor() {
        super('play');
    }

    create() {


        const starttext = this.add.text(window.innerWidth/2,window.innerHeight/2,'start!!!',{fontSize: '60px'});

        this.tweens.add({
            targets: starttext,
            alpha: 0,
            duration: 3000,
            ease: 'Power2'
        });

        //メイン画面構築
        

    }
}

export default play;