

import * as Phaser from 'phaser';
import { Scenes } from './scene/scenes';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,  // webGLを使うかcanvasを使うかをphaserが自動で判断してくれる
  width: window.innerWidth,
  height: window.innerHeight,
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  backgroundColor:'0xffa791',
  parent: 'game-app',  // #game-app内にcanvasを生成
  scene: Scenes
};

new Phaser.Game(config);
