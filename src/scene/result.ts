import Phaser from "phaser";

class result extends Phaser.Scene {
    result; //ゲーム結果
    cnt;    //撫でた回数

    constructor(result:boolean, cnt:number){
        super('result');

        this.result = result;
        this.cnt = cnt;
    }

    create(){
        //結果で出力内容が変わる
        if(result){
            //クリアパターン

        } else {
            //ゲームオーバーパターン

        }

        //共通パーツ（TOPに戻るボタンともう一度遊ぶボタン)

        const topbtn = this.add.image(0,0,'top');
        topbtn.setInteractive();
        topbtn.on('pointerdown', () => {
            this.scene.start('title');
        })

        const playbtn = this.add.image(200,0,'onemore');
        playbtn.setInteractive();
        playbtn.on('pointerdown', () => {
            this.scene.start('play');
        })
    }
}

export default result;