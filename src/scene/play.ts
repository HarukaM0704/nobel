import Phaser from "phaser";
import Button from "../class/button";

class play extends Phaser.Scene {

    //猫の数と猫の長さを決める
    catlength: number[] = [3,2,1]
    //撫でてもいい回数を決める
    putmaxcnt: number = 28;
        
    //撫でた場所を覚えておく配列
    putcheck: boolean[][] = [
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false]
    ]

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
//        const button00 = new Button(this, 100, 100, "Button", {
//            onClick: () =>{
//                console.log("Click!!");
//            }
//        })

 //       const button01 = new Button(this, 200,100,"Button", {});
        //ボタンの配置を覚えておく配列
        const buttons[][] = [
            [button00,button01,button02,button03,button04],
            [button10,button11,button12,button13,button14],
            [button20,button21,button22,button23,button24],
            [button30,button31,button32,button33,button34],
            [button40,button41,button42,button43,button44]
        ]

        for(var i=0; i<buttons.length; i++ ){
            for(var j=0; j<buttons.length; j++){
                var cattext="";
                if(this.cat[i][j]!=0){
                    cattext="ねこ";
                }else{
                    cattext="いない";
                }
                buttons[i][j] = new Button(this, 200,100,"Button", {
                        onClick(cattext);
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