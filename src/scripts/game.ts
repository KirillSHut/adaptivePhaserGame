import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import { gameSizeConfig } from './configs/GameSizeConfig';
import { OrientationUtil } from './utils';

// Changing sizes based on orientation
const currentOrientation = OrientationUtil.get();

const gameSize = gameSizeConfig[currentOrientation];
console.log(currentOrientation);
const DEFAULT_WIDTH = gameSize.width;
const DEFAULT_HEIGHT = gameSize.height;

// Changing sizes based on orientation

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);

})
