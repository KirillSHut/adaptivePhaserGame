import { Logo, SpinButton } from '../objects';
import { OrientationChangeManager, OrientationStateManager } from '../adaptive';
import { logoConfig, gameSceneTextConfig, spinButtonConfig } from '../configs';
import { EOrientationEvents, EScreenOrientations } from '../contracts';
import { gameSizeConfig } from '../configs/GameSizeConfig';
import { SingletonManager } from '../manager';

export default class MainScene extends Phaser.Scene {
  public orientationChangeManager: OrientationChangeManager;
  public orientationStateManager: OrientationStateManager;

  public logo: Logo;
  public spinButton: SpinButton;
  public orientationText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.createOrientationChangeManager();
    this.createOrientationStateManager();

    this.createPhaserLogo();
    this.createSpinButton();
    this.createOrientationText();

    this.handleOrientationChange();
  }

  private createOrientationChangeManager(): void {
    this.orientationChangeManager = SingletonManager.getInstance(OrientationChangeManager, this);

    this.orientationChangeManager.setScene(this);
  }

  private createOrientationStateManager(): void {
    this.orientationStateManager = SingletonManager.getInstance(OrientationStateManager);
  }

  private handleOrientationChange(): void {
    this.events.on(EOrientationEvents.ORIENTATION_CHANGED, () => {
      const { width, height } = gameSizeConfig[this.currentGameOrientation];

      this.orientationText.setText(this.currentGameOrientation);
      this.game.scale.setGameSize(width, height);
      this.game.scale.refresh();
      this.physics.world.setBounds(0, 0, width, height);
      this.cameras.main.setViewport(0, 0, width, height);
    })
  }

  private createOrientationText(): void {
    const textConfig = gameSceneTextConfig[this.currentGameOrientation];

    this.orientationText = this.add.text(30, 15, textConfig.text).setOrigin(0, 0);;
    this.orientationText.setStyle(textConfig.styles);
  }

  private createPhaserLogo(): void {
    const { x, y } = logoConfig[this.currentGameOrientation];

    this.logo = new Logo(this, x, y);
  }

  private createSpinButton(): void {
    const { x, y } = spinButtonConfig[this.currentGameOrientation];

    this.spinButton = new SpinButton(this, x, y, "interface", "spinDefault");
  }

  public get currentGameOrientation(): EScreenOrientations {
    return this.orientationStateManager.currentGameOrientation;
  }
} 
