import 'phaser'
import "phaser/plugins/spine/dist/SpinePlugin";
import { GameScene, PreloadScene } from './scenes';
import { gameSizeConfig } from './configs/GameSizeConfig';
import { SingletonManager } from './decorators';
import { OrientationManager, OrientationStateManager } from './orientation';

// Changing sizes based on orientation
const { currentGameOrientation } = SingletonManager.getInstance(OrientationStateManager);
const gameSize = gameSizeConfig[currentGameOrientation];

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
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { x: 0, y: 0 }
    }
  },
  plugins: {
    scene: [
      // @ts-ignore
      { key: "SpinePlugin", plugin: window.SpinePlugin, mapping: "spine" }
    ]
  }
}

class GameEngine extends Phaser.Game {
  private orientationManager: OrientationManager = new OrientationManager(this);

  constructor() {
    super(config);

    this.initOrientationManager();

    this.scene.add("PreloadScene", PreloadScene);
    this.scene.add("GameScene", GameScene);
    this.scene.start("PreloadScene");
  }

  private initOrientationManager() {
    this.orientationManager.init();
  }
}

window.addEventListener('load', () => {
  const game = new GameEngine();
})
