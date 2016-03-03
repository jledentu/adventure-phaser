var UndirectedGraph = require('./undirected-graph.js');
var Polygon = require('./polygon.js');

class VisibilityGraph extends UndirectedGraph {
  constructor(polygon) {

    super();

    this.start = undefined;
    this.end = undefined;

    if (polygon instanceof Polygon) {

      this._polygon = polygon;

      // Get convex points
      let convexVertices = this._polygon.getConvexVertices();

      for (let i = 0; i < convexVertices.length; i++) {
        let vIndex = convexVertices[i];
        this.addNode(i, this._polygon.vertices[vIndex]);

        for (let j = i - 1; j >= 0; j--) {

          let targetIndex = convexVertices[j];

          if (targetIndex < vIndex - 1 || targetIndex > vIndex + 1) {

            let source = this._polygon.vertices[vIndex];
            let target = this._polygon.vertices[targetIndex];

            if (this._polygon.lineOfSight(source, target)) {
              this.addEdge(i, j, this._getDistance(source.x, source.y, target.x, target.y));
            }
          }
        }
      }
    }
  }

  addNode(id, data) {

    super.addNode(id, data);

    // Get convex points
    let convexVertices = this._polygon.getConvexVertices();

    for (let node of this._nodes.entries()) {

      if (id !== node[0] && this._polygon.lineOfSight({x: data.x, y: data.y}, node[1])) {
        this.addEdge(id, node[0], {distance: this._getDistance(data.x, data.y, node[1].x, node[1].y)});
      }
    }
  }

  setStartNode(x, y) {

    this.setNode('start', {x: x, y: y});
  }

  setEndNode(x, y) {

    this.setNode('end', {x: x, y: y});
  }

  getShortestPath() {
    let openList   = [];
		let closedList = [];

    if (this.start === undefined || this.end === undefined) {
      return;
    }

    console.log(this.edges);

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
        let cost = currentNode.g + adjacent.distance;

        let adjIndexInOpen = openList.findIndex(x => x.node === adjacent.target);
        if (adjIndexInOpen >= 0 && cost < openList[adjIndexInOpen].g) {
          openList.splice(adjIndexInOpen, 1);
        }

        let adjIndexInClosed = closedList.findIndex(x => x.node === adjacent.target);
        if (adjIndexInClosed >= 0 && cost < closedList[adjIndexInClosed].g) {
          closedList.splice(adjIndexInClosed, 1);
        }

        if (adjIndexInOpen < 0 && adjIndexInClosed < 0) {
          openList.push({
            node: adjacent.target,
            g: cost,
            f: cost + this._heuristic(this.nodes[adjacent.target], this.nodes[this.end]),
            parent: currentNode.node
          });
        }
      }

      console.log(JSON.stringify(openList));
    }
  }

  _getDistance(aX, aY, bX, bY) {
    return Math.abs(bX - aX) + Math.abs(bY - aY);
  }

  _heuristic(pos0, pos1) {
    return this._getDistance(pos0.x, pos0.y, pos1.x, pos1.y);
  }
}

module.exports = VisibilityGraph;
