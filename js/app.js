require('pixi.js');
global.p2 = require('p2');
var Phaser = require('phaser');
var LoadState = require('./states/load');

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
var states = requireAll(require.context('./states', true, /^(.*\.(js$))[^.]*$/igm));

class Game extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO, '');

    states.forEach(function(state) {
      this.state.add(state.getName(), new state());
    }.bind(this));

    this.state.start('game');
  }
}

new Game();
