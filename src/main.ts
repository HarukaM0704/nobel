

import * as Phaser from 'phaser';
import { Scenes } from './scene/scenes';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,  // webGLを使うかcanvasを使うかをphaserが自動で判断してくれる
  width: Math.min(window.innerWidth, 1920),
  height: Math.min(window.innerHeight, 1080),
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  backgroundColor:'0xffa791',
  parent: 'game-app',  // #game-app内にcanvasを生成
  dom: {
		createContainer: true
	},
  scene: Scenes
};

new Phaser.Game(config);
