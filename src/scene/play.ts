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
        //左上に残り回数
        const restput = this.add.text(50,50,this.putmaxcnt.toString());

        const catimage:Phaser.GameObjects.Image[] = new Array;
        //右側にのこりのねこ
        this.add.text(500,100,"なでたねこ",{fontSize:30});
        this.catlength.forEach((value, i) => {
            console.log(i);
            catimage[i] = this.add.image(500,100*i+200,'robot');
            catimage[i].setAlpha(0).setOrigin(0).setDisplaySize(100,100);

        })

        //ボタンを配置
        for(var i=0; i<this.cat.length; i++){            
            for(var j=0; j<this.cat.length; j++){

                const catcheck = this.cat[i][j];
                const setButton = new Button(this, 85*j+100,85*i+100,"Button"+i+j,{  
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
                                    catimage[i].setAlpha(1);
                                    check++;
                                }
                            });
                            if(check===this.catlength.length){
                                console.log("clear!");
                            }
                            if(this.putcnt===this.putmaxcnt){
                                console.log("gameover...");
                            }
                        }
                    }
                });

            }
        }
        

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
    

    }
    

}

export default play;