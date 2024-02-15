import { OrientationChangeManager, OrientationStateManager } from "../adaptive";
import { gameSizeConfig, preloadSpineConfig } from "../configs";
import { EOrientationEvents, EScreenOrientations } from "../contracts";
import { SingletonManager } from "../manager";

export default class PreloadScene extends Phaser.Scene {
  public orientationChangeManager: OrientationChangeManager;
  public orientationStateManager: OrientationStateManager;
  public linkToGameScene: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.atlas("interface", 'assets/sprites/interface.png', 'assets/sprites/interface.json');

    // @ts-ignore
    this.load.spine("bat", 'assets/spines/bat/bat.json', 'assets/spines/bat/bat.atlas');
  }

  create() {
    this.createOrientationChangeManager();
    this.createOrientationStateManager();
    this.handleOrientationChange();

    this.createLinkToGameScene();
    this.createSpine();

  }


  private createSpine(): void {
    const { x, y } = preloadSpineConfig[this.currentGameOrientation];
    // @ts-ignore
    const spine = this.add.spine(x, y, "bat", "flying", true);

    this.events.on(EOrientationEvents.ORIENTATION_CHANGED, () => {
      const { x, y } = preloadSpineConfig[this.currentGameOrientation];

      spine.setPosition(x, y);
    })
  }

  private handleOrientationChange(): void {
    this.events.on(EOrientationEvents.ORIENTATION_CHANGED, () => {
      const { width, height } = gameSizeConfig[this.currentGameOrientation];

      this.game.scale.setGameSize(width, height);
      this.game.scale.refresh();
      this.physics.world.setBounds(0, 0, width, height);
      this.cameras.main.setViewport(0, 0, width, height);
    })
  }

  private createLinkToGameScene(): void {
    this.linkToGameScene = this.add.text(30, 30, "Go to GameScene", {
      color: '#000000',
      fontSize: '60px'
    });

    this.linkToGameScene.setInteractive({ cursor: "pointer" });

    this.linkToGameScene.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start('MainScene');
    })
  }

  private createOrientationChangeManager(): void {
    this.orientationChangeManager = SingletonManager.getInstance(OrientationChangeManager, this);
  }

  private createOrientationStateManager(): void {
    this.orientationStateManager = SingletonManager.getInstance(OrientationStateManager);
  }

  public get currentGameOrientation(): EScreenOrientations {
    return this.orientationStateManager.currentGameOrientation;
  }
}
