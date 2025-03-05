import Phaser from "phaser";
import Button from "../class/button";

class play extends Phaser.Scene {

    //猫の数と猫の長さを決める
    catlength: number[] = [3,2,1]
    //撫でてもいい回数を決める
    putmaxcnt: number = 15;
    //どの猫がどこにいるかを把握する配列
    cat: number[][]= [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];

    //撫でた回数
    putcnt: number = 0;
    //猫ごとの撫でた回数
    putcat: number[] = [0,0,0];

    constructor() {
        super('play');
    };
    

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

       const starttext = this.add.text(window.innerWidth/2,window.innerHeight/2,'start!!!',{fontSize: '60px'});
       this.tweens.add({
            targets: starttext,
            alpha: 0,
            duration: 3000,
            ease: 'Power2'
        });



        //猫配置
        catset(this.catlength,this.cat);


        //画面構築
        const back = this.add.image(window.innerWidth/2,window.innerHeight/2, 'play');
        const kotatu = this.add.image(back.x-20,back.y,'kotatu');
        const container = this.add.container(kotatu.x,kotatu.y);
        
        //左上に残り回数
        const hand = this.add.image(-kotatu.width/2-70,-kotatu.height/2+20,'hand');
        const ato = this.add.text(-kotatu.width/2-100,-kotatu.height/2-10,"あと",{fontSize:25, color:'gray'});
        const restput = this.add.text(-kotatu.width/2-90,-kotatu.height/2+20,this.putmaxcnt.toString(),{fontSize:40,color:'gray'}).setOrigin(0);
        const kai = this.add.text(-kotatu.width/2-60,-kotatu.height/2+60,"回",{fontSize:25, color:'gray'});
        
        const text = this.add.text(kotatu.width/2+10,-kotatu.height/3,"なでたねこ",{fontSize:30, color:'gray'});
        container.add([hand, restput, ato, kai, text]);
        
        //右側にのこりのねこ
        const beforecatimage:Phaser.GameObjects.Image[] = new Array;
        const aftercatimage:Phaser.GameObjects.Image[] = new Array;

        this.catlength.forEach((_value, i) => {
            beforecatimage[i] = this.add.image(kotatu.width/2+80,100*i-kotatu.height/6,'robot');
            beforecatimage[i].setAlpha(1).setDisplaySize(100,100);

            aftercatimage[i] = this.add.image(kotatu.width/2+80,100*i-kotatu.height/6,'robot');
            aftercatimage[i].setAlpha(0).setDisplaySize(100,100);

            container.add([beforecatimage[i], aftercatimage[i]]);

        })

        

        //ボタンを配置        
        for(var i=0; i<this.cat.length; i++){            
            for(var j=0; j<this.cat.length; j++){

                const catcheck = this.cat[i][j];
                const setButton = new Button(this, -kotatu.width/3+85*j,-kotatu.height/3+85*i,"Button"+i+j, catcheck, {  
                    onClick: () => {
                        if(!setButton.getClk()){
                            this.putcnt++;
                            restput.setText((this.putmaxcnt-this.putcnt).toString());
                            if(catcheck!=0){
                                this.putcat[catcheck-1]++;
                            }
                        
                            var check=0;
                            this.catlength.forEach((value, i) => {
                                if(this.putcat[i]===value){
                                    beforecatimage[i].setAlpha(0);
                                    aftercatimage[i].setAlpha(1);
                                    check++;
                                }
                            });
                            if(check===this.catlength.length){
                                console.log("clear!");
                                this.scene.start('result',{result:true, cnt:this.putcnt});
                            }
                            if(this.putcnt===this.putmaxcnt){
                                console.log("gameover...")
                                this.scene.start('result',{result:false, cnt:this.putcnt});
                            }
                        }
                    }
                });
                container.add(setButton);
            }
        }
        
        fit();

        //猫配置関数
        function catset(catlength:number[],cat:number[][]) {
            //猫の数だけ繰り返す
            var i = 0;
            while(i<catlength.length){
                //方向を決める(1~4)
                const dir = Math.floor(Math.random() * catlength.length) + 1;
                //始点の座標を決める
                const catx = Math.floor(Math.random() * cat.length);
                const caty = Math.floor(Math.random() * cat.length);
                /*ログ*/
                console.log("dir:" + dir);
                console.log("catx:" + catx);
                console.log("caty:" + caty);

                //重なっていないか、範囲内に収まるかチェック
                var rangecheck = true;
                switch(dir){
                    case 1:
                        if(caty-catlength[i]-1<0){
                            rangecheck=false;
                            break;
                        }
                        for(var j=0;j<catlength[i];j++){
                            if(cat[caty-j][catx] != 0){
                                rangecheck=false;
                                break;
                            }
                        }
                        break;
                    case 2:
                        if(catx+catlength[i]-1>=cat.length){
                            rangecheck=false;
                            break;
                        }
                        for(var j=0;j<catlength[i];j++){
                            if(cat[caty][catx+j] != 0){
                                rangecheck=false;
                                break;
                            }
                        }
                        break;
                    case 3:
                        if(caty+catlength[i]-1>=cat.length){
                            rangecheck=false;
                            break;
                        }
                        for(var j=0;j<catlength[i];j++){
                            if(cat[caty+j][catx] != 0){
                                rangecheck=false;
                                break;
                            }
                        }
                        break;
                    case 4:
                        if(catx-catlength[i]-1<0){
                            rangecheck=false;
                            break;
                        }
                        for(var j=0;j<catlength[i];j++){
                            if(cat[caty][catx-j] != 0){
                                rangecheck=false;
                                break;
                            }
                        }
                        break;
                }
                console.log(rangecheck);

                if(rangecheck==false){
                    continue;
                }

                //実際に配置する
                for(var j=0;j<catlength[i];j++){
                    console.log("j:" + j);
                    switch(dir) {
                        //上向き
                        case 1:
                            cat[caty-j][catx] = i+1;
                            break;
                        //右向き
                        case 2:
                            cat[caty][catx+j] = i+1;
                            break;
                        //下向き
                        case 3:
                            cat[caty+j][catx] = i+1;
                            break;
                        //左向き
                        case 4:
                            cat[caty][catx-j] = i+1;
                            break;
                    }
                    console.log(cat);

                }
                i++;            
            }
        }

        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            back.setPosition(window.innerWidth/2,window.innerHeight/2);
            kotatu.setPosition(window.innerWidth/2,window.innerHeight/2);
            container.setPosition(window.innerWidth/2,window.innerHeight/2);

            fit();
            win.height=window.innerHeight;
            win.width=window.innerWidth;

        });
    

    }
    

}

export default play;