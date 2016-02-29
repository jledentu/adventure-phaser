var VisibilityGraph = require('./pathfinding/visibility-graph.js');

class Navigator {
  constructor() {

  }

  set polygon(polygon) {
    this._polygon = polygon;
    this._graph = new VisibilityGraph(polygon);
  }

  setStart(x, y) {
    this._start = {x: x, y: y};
    this._graph.setStartNode(x, y);
  }

  navTo(x, y) {
    this.end = {x: x, y: y};
    this._graph.setEndNode(x, y);
  }
}

module.exports = Navigator;
