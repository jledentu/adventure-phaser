var Phaser = require('phaser');

class GameState extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    this.loadScene('scene1');
    this.graphics = this.game.add.graphics(0, 0);
  }

  create() {
    this.game.input.onTap.add(this.onTap.bind(this), this);
  }

  render() {
    this.graphics.clear();

    this.drawWalkableArea();
    this.drawTriangles();
  }

  loadScene(scene) {
    this.scene = require(`scenes/${scene}.json`);

    let triangles = PIXI.EarCut.Triangulate(this.scene.walkable);
    this.walkTriangles = triangles.map(index => new Phaser.Point(this.scene.walkable[index * 2], this.scene.walkable[index * 2 + 1]));
  }

  /**
   * Draw the walkable area.
   */
  drawWalkableArea() {
    if (this.scene && this.scene.walkable) {
      this.graphics.beginFill(0xFF3300, 0.0);
      this.graphics.lineStyle(1, 0xFF3300, 1.0);
      this.graphics.drawPolygon(this.scene.walkable);
      this.graphics.endFill();
    }
  }

  drawTriangles() {
    if (this.walkTriangles) {
      this.graphics.beginFill(0x0033FF, 0.0);
      this.graphics.lineStyle(1, 0x0033FF, 1.0);

      for (let i = 0; i < this.walkTriangles.length - 2; i = i + 3) {
        this.graphics.drawPolygon([this.walkTriangles[i], this.walkTriangles[i + 1], this.walkTriangles[i + 2]]);
      }
      this.graphics.drawTriangle(this.walkTriangles);
      this.graphics.endFill();
    }
  }

  onTap(pointer, doubleTap) {
    console.log(pointer);
    console.log(this.game.input.x);
    console.log(this.game.input.y);
  }

  static getName() {
    return 'game';
  }
}

module.exports = GameState;
