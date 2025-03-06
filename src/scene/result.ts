import Phaser from "phaser";

class result extends Phaser.Scene {

    constructor(){
        super('result');
    }

    create(data:{result:boolean,cnt:number}){

        let win = {
            width: window.innerWidth,
            height: window.innerHeight
        }

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

        //結果で出力内容が変わる
        let back: Phaser.GameObjects.Image;
        if(data.result){
            //クリアパターン
            back = this.add.image(window.innerWidth/2, window.innerHeight/2, 'clear');
        } else {
            //ゲームオーバーパターン
            back = this.add.image(window.innerWidth/2, window.innerHeight/2, 'gameover');
        }

        const scw = window.innerWidth/back.width;
        const sch = window.innerHeight/back.height;
        if(window.innerHeight>window.innerWidth){
            back.setSize(back.height,back.width*scw).setDisplaySize(back.width,back.height);
        }else{
            back.setSize(back.width,back.height*sch).setDisplaySize(back.width,back.height);
        }

        //共通パーツ（TOPに戻るボタンともう一度遊ぶボタン)

        const container = this.add.container(innerWidth/2,innerHeight/2).setSize(back.width,back.height);

        const topbtn = this.add.image(-back.width/3,back.height/4,'top').setDisplaySize(200,100).setAlpha(0.7);
        topbtn.setInteractive();
        topbtn.on('pointerdown', () => {
            this.scene.start('title');
        })

        const playbtn = this.add.image(back.width/3,back.height/4,'onemore').setDisplaySize(200,100).setAlpha(0.7);
        playbtn.setInteractive();
        playbtn.on('pointerdown', () => {
            
            this.scene.start('play');
        })

        container.add([topbtn, playbtn]);

        fit();
    }
}

export default result;