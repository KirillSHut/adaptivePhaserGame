import 'phaser'
import "phaser/plugins/spine/dist/SpinePlugin";
import { GameScene, PreloadScene } from './scenes';
import { SingletonManager } from './decorators';
import { OrientationManager } from './orientation';
import { OrientationConfig, gameConfig } from './configs';

class GameEngine extends Phaser.Game {
  private orientationConfig: OrientationConfig = new OrientationConfig();
  private orientationManager: OrientationManager = SingletonManager.getInstance(OrientationManager, this, this.orientationConfig);

  constructor() {
    super(gameConfig);

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
