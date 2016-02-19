var Phaser = require('phaser');

class LoadState extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    this.game.load.image('logo', require('assets/phaser.png'));
  }

  create() {
    let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }

  static getName() {
    return 'load';
  }
}

module.exports = LoadState;
