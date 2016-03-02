var Phaser = require('phaser');
var Navigator = require('../navigator.js');
var Polygon = require('../pathfinding/polygon.js');

class GameState extends Phaser.State {
  constructor() {
    super();
    this.navigator = new Navigator();
  }

  preload() {
    this.loadScene('scene1');
    this.graphics = this.game.add.graphics(0, 0);
  }

  create() {
    this.game.input.onTap.add(this.onTap, this);
  }

  render() {
    this.graphics.clear();

    this._drawWalkableArea();
    this.graphics.lineStyle(1, 0x00FF00, 1.0);

    if (this.navigator._graph.edges) {
      for (let [vertex, edges] of this.navigator._graph.edges) {
        for (let i = 0; i < edges.length; i++) {
          this.graphics.moveTo(this.navigator._graph.nodes[vertex].x, this.navigator._graph.nodes[vertex].y);
          this.graphics.lineTo(this.navigator._graph.nodes[edges[i].target].x, this.navigator._graph.nodes[edges[i].target].y);
        }
      }
    }
  }

  loadScene(scene) {
    this.scene = require(`scenes/${scene}.json`);

    this.polygon = new Polygon(this.scene.walkable);
    this.navigator.polygon = this.polygon;
  }

  /**
   * Draw the walkable area.
   */
  _drawWalkableArea() {
    if (this.scene && this.scene.walkable) {
      this.graphics.beginFill(0xFF3300, 0.0);
      this.graphics.lineStyle(1, 0xFF3300, 1.0);
      this.graphics.drawPolygon(this.scene.walkable);
      this.graphics.endFill();
    }
  }

  onTap(pointer, doubleTap) {
    console.log(pointer);
    console.log(this.game.input.x);
    console.log(this.game.input.y);

    this.navigator.navTo(this.game.input.x, this.game.input.y);
  }

  static getName() {
    return 'game';
  }
}

module.exports = GameState;
