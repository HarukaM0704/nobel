import Phaser from "phaser";

class loading extends Phaser.Scene {

    progressBar!: Phaser.GameObjects.Rectangle;
    wholeCanvas!: Phaser.GameObjects.Zone;
    loadingText!: any;

    constructor() {
        super('loading');
    }

    preload() {
        this.game = this.sys.game;
        
        this.progressBar = this.add.rectangle(0, this.game.canvas.height / 2, 0, 8, 0xffffff);
        this.loadingText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 - 30, 'loading...', {});
        this.loadingText.setOrigin(0.5);

        // ロード進行中はプログレスバーの伸縮を進捗率に応じて変化させる。
        this.scene.scene.load.on('progress', this._updateBar.bind(this));
        // すべてのファイルのロードが完了したらローディング画面はフェードアウトしてメインのシーンに遷移する。
        this.scene.scene.load.on('complete', this._fadeoutMainCamera.bind(this));

        this.load.image('street', 'src/assets/street.png');
        this.load.image('robot', 'src/assets/robot.png');
        this.load.image('title', 'src/assets/title.png');

    }

     /** 
     * ローディングプログレスバーの幅を進捗率に応じて伸縮する。
     * @param percentage ローディングの進捗率。 
     */
     private _updateBar(percentage: number) {
        this.progressBar.width = this.game.canvas.width * percentage;
    }

    /**
     * メインカメラを1秒かけてフェードアウトさせる。
     */
    private _fadeoutMainCamera() {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
    }


    create() {
        // フェードアウトが完了したとき
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {

            if (this.progressBar) {
                this.progressBar.destroy();
                this.loadingText.destroy();
            }

            this.cameras.main.fadeIn(1000, 255, 255, 255);
        });

        this.cameras.main.fadeOut(1000, 255, 255, 255);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            //this.scene.transition({target:'title',duration: 5000});
            this.scene.start('title');
        });
    }
}

export default loading;