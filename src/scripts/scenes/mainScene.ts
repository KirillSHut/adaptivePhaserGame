import { Logo, SpinButton } from '../objects';
import { OrientationChangeManager } from '../adaptive';
import { logoConfig, gameSceneTextConfig, spinButtonConfig } from '../configs';
import { EGameSceneEvents, EScreenOrientations } from '../contracts';
import { gameSizeConfig } from '../configs/GameSizeConfig';
import { OrientationUtil } from '../utils';

export default class MainScene extends Phaser.Scene {
  public orientationChangeManager: OrientationChangeManager = new OrientationChangeManager(this);
  public logo: Logo;
  public spinButton: SpinButton;
  public orientationText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.createPhaserLogo();
    this.createSpinButton();

    this.createOrientationText();
    this.handleOrientationChange();
  }

  handleOrientationChange(): void {
    this.events.on(EGameSceneEvents.GAME_SCENE_ORIENTATION_CHANGE, () => {
      const { width, height } = gameSizeConfig[this.currentOrientation];

      this.orientationText.setText(this.currentOrientation);
      this.game.scale.setGameSize(width, height);
      this.game.scale.refresh();
      this.physics.world.setBounds(0, 0, width, height);
      this.cameras.main.setViewport(0, 0, width, height);
    })
  }

  createOrientationText(): void {
    const textConfig = gameSceneTextConfig[this.currentOrientation];

    this.orientationText = this.add.text(30, 15, textConfig.text).setOrigin(0, 0);;
    this.orientationText.setStyle(textConfig.styles);
  }

  createPhaserLogo(): void {
    const { x, y } = logoConfig[this.currentOrientation];

    this.logo = new Logo(this, x, y);
  }

  createSpinButton(): void {
    const { x, y } = spinButtonConfig[this.currentOrientation];

    this.spinButton = new SpinButton(this, x, y, "interface", "spinDefault");
  }

  public get currentOrientation(): EScreenOrientations {
    return OrientationUtil.get();
  }
} 
