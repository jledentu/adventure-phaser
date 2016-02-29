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

            if (this._polygon.lineOfSight(this._polygon.vertices[vIndex], this._polygon.vertices[targetIndex])) {
              this.edges.get(i).push(j);
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
        this.edges.get(this.nodes.length - 1).push(i);
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
}

module.exports = VisibilityGraph;
