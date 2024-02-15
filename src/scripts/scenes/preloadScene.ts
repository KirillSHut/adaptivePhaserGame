export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.atlas("interface", 'assets/sprites/interface.png', 'assets/sprites/interface.json');
    // this.load.atlas("interface", 'assets/sprites/interface.png', 'assets/sprites/interface.json');
  }

  create() {
    this.scene.start('MainScene')
  }
}
