

import * as Phaser from 'phaser';
import { Scenes } from './scene/scenes';

const scale:Phaser.Types.Core.ScaleConfig = {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
};

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,  // webGLを使うかcanvasを使うかをphaserが自動で判断してくれる
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor:'0xffe6b2',
  parent: 'game-app',  // #game-app内にcanvasを生成
  scene: Scenes
};

new Phaser.Game(config);
