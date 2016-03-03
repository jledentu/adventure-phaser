var DirectedGraph = require('./directed-graph.js');

class UndirectedGraph extends DirectedGraph {
  constructor() {
    super();
  }

  addEdge(u, v, data) {
    if (this.isNode(u) && this.isNode(v)) {
      this._edges.get(u).push({target: v, data: data});
      this._edges.get(v).push({target: u, data: data});

      return true;
    }

    return false;
  }

  removeNode(id) {

    if (super.removeNode(id)) {
      for (let adjacents of this._edges) {
        let index = adjacents.findIndex(e => e.target === id);
        if (index !== -1) {
          adjacents.splice(index, 1);
        }
      }

      return true;
    }

    return false;
  }

  removeEdge(u, v) {
    return super.removeEdge(u, v) && super.removeEdge(v, u);
  }
}

module.exports = UndirectedGraph;
