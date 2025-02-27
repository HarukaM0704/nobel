import * as Phaser from "phaser"


interface Props{
	width?: number;
	height?: number;
	onClick?: Function;
}

export default class Button extends Phaser.GameObjects.Container {
	seKey: string = "";
	text: Phaser.GameObjects.Text = null;
	ans: Phaser.GameObjects.Image = null;
	container: Phaser.GameObjects.Rectangle = null;
	clk=false;
	alertcontainer: Phaser.GameObjects.Rectangle = null;
	alerttext: Phaser.GameObjects.Text = null;

	constructor (scene: Phaser.Scene, x:number, y:number, text:string, cat:number, props: Props, { align = 'center', fontSize = 15, color = "black" } = {}) {
		super(scene, x, y)

		const {
			width = 80,
			height = 80,
			onClick
		} = props

		this.scene = scene;
		this.scene.add.existing(this);

		this.setSize(width,height).setInteractive();


		this.container = scene.add.rectangle(0, 0, width, height);
		this.container.setStrokeStyle(1, 0xffffff).setOrigin(0.5);

		if(cat!==0){
			this.ans = scene.add.image(0,0,'maru').setSize(width,height).setAlpha(0);
		} else {
			this.ans = scene.add.image(0,0,'batu').setSize(width,height).setAlpha(0);
		}

		this.text = scene.add.text(0, 0, text, { align, fontSize , color}).setOrigin(0.5).setPadding(0, 0, 0, 0)
		this.text.setColor("black").setAlpha(0);

		this.alertcontainer = scene.add.rectangle(scene.sys.game.canvas.width/2,scene.sys.game.canvas.height/2,300,200,0xffffff,0.5);
		this.alertcontainer.setAlpha(0).setOrigin(0.5);

		this.alerttext = scene.add.text(scene.sys.game.canvas.width/2,scene.sys.game.canvas.height/2,"クリック済").setOrigin(0.5);
		this.alerttext.setAlpha(0);

		this.add([this.container, this.text, this.ans])
		this.on('pointerdown', p => {
			onClick && onClick(p);
			if(this.clk){
				this.alertcontainer.setAlpha(1);
				this.alerttext.setAlpha(1);
				scene.tweens.add({
					targets: this.alertcontainer,
					alpha: 0,
					duration: 2000,
					ease: 'Power2'
				});
				scene.tweens.add({
					targets: this.alerttext,
					alpha: 0,
					duration: 2000,
					ease: 'Power2'					
				})

			} else {
				this.ans.setAlpha(1);
				this.clk=true;
			}
		})
	}

	getClk(){
		return this.clk;
	}
}
