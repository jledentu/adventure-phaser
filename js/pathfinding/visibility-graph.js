var Polygon = require('./polygon.js');

class VisibilityGraph {
  constructor(polygon) {

    this.nodes = [];
    this.edges = new Map();
    this.start = undefined;
    this.end = undefined;

    if (polygon instanceof Polygon) {

      this._polygon = polygon;

      // Get convex points
      let convexVertices = this._polygon.getConvexVertices();

      for (let i = 0; i < convexVertices.length; i++) {
        let vIndex = convexVertices[i];
        this.nodes.push(this._polygon.vertices[vIndex]);
        this.edges.set(i, []);

        for (let j = i + 1; j < convexVertices.length; j++) {

          let targetIndex = convexVertices[j];

          if (targetIndex < vIndex - 1 || targetIndex > vIndex + 1) {

            let source = this._polygon.vertices[vIndex];
            let target = this._polygon.vertices[targetIndex];

            if (this._polygon.lineOfSight(source, target)) {
              this.edges.get(i).push({target: j, distance: this._getDistance(source.x, source.y, target.x, target.y)});
            }
          }
        }
      }
    }
  }

  addNode(x, y) {
    this.nodes.push({x: x, y: y});
    this.edges.set(this.nodes.length - 1, []);

    // Get convex points
    let convexVertices = this._polygon.getConvexVertices();

    for (let i = 0; i < this.nodes.length - 1; i++) {

      if (this._polygon.lineOfSight({x: x, y: y}, this.nodes[i])) {
        this.edges.get(this.nodes.length - 1).push({target: i, distance: this._getDistance(x, y, this.nodes[i].x, this.nodes[i].y)});
      }
    }

    return this.nodes.length - 1;
  }

  removeNode(index) {
    this.nodes.splice(index, 1);

    // Remove from edges
    for (let i = 0; i < this.edges.length - 1; i++) {
      let edges = this.edges.get(i);

      let found = edges.indexOf(index);
      edges.splice(found, 1);
    }
  }

  setStartNode(x, y) {

    if (this.start !== undefined) {
      this.removeNode(this.start);
    }

    this.start = this.addNode(x, y);
  }

  setEndNode(x, y) {

    if (this.end !== undefined) {
      this.removeNode(this.end);
    }

    this.end = this.addNode(x, y);
  }

  getShortestPath() {
    let openList   = [];
		let closedList = [];
		openList.push({node: this.start, f: 0, g: 0, h: 0, parent: null});

    while (openList.length > 0) {

      // Find the best node
      let min = 0;
			for (let i = 0; i < openList.length; i++) {
				if (openList[i].f < openList[min].f) {
          min = i;
        }
			}

      let currentNode = openList[min];
      closedList.push(currentNode);
      openList.splice(min, 1);

      if (currentNode.node === this.end) {
        break;
      }

      for (let adjacent of this.edges.get(currentNode.node)) {
        let cost = currentNode.node.g + adjacent.distance;

        let adjIndexInOpen = openList.findIndex(x => x.node === adjacent.target);
        if (adjIndexInOpen >= 0 && cost < openList[adjIndexInOpen].g) {
          openList.splice(adjIndexInOpen, 1);
        }

        let adjIndexInClosed = closedList.findIndex(x => x.node === adjacent.target);
        if (adjIndexInClosed >= 0 && cost < openList[adjIndexInOpen].g) {
          closedList.splice(adjIndexInClosed, 1);
        }

        if (adjIndexInOpen < 0 && adjIndexInClosed < 0) {
          openList.push({
            node: adjacent.target,
            g: cost,
            f: cost + this._heuristic(this.nodes[adjacent], this.nodes[this.end]),
            parent: currentNode.node
          });
        }
      }
    }

    console.log(openList);
    console.log(closedList);
  }

  _getDistance(aX, aY, bX, bY) {
    return Math.abs(bX - aX) + Math.abs(bY - aY);
  }

  _getHeuristic(pos0, pos1) {
    return this._getdistance(pos0.x, pos0.y, pos1.x, pos1.y);
  }
}

module.exports = VisibilityGraph;
