class DirectedGraph {
  constructor() {
    this._nodes = new Map();
    this._edges = new Map();
  }

  addNode(id, data) {
    if (this.isNode(id)) {
      return false;
    }
    this._nodes.set(id, data);
    this._edges.set(id, []);
    return true;
  }

  setNode(id, data) {
    if (this.isNode(id)) {
      this.removeNode(id);
    }
    this.addNode(id, data);
  }

  addEdge(u, v, data) {
    if (this.isNode(u) && this.isNode(v)) {
      this._edges.get(u).push({target: v, data: data});
      return true;
    }
  }

  isNode(id) {
    return this._nodes.has(id);
  }

  isEdge(u, v) {
    return this.isNode(u) && this.isNode(v) && this._edges.get(u).find(e => e.target === v);
  }

  getNodeData(id) {
    return this._nodes.get(id);
  }

  getEdgeData(u, v) {
    if (this.isNode(u) && this.isNode(v)) {
      let edge = this._edges.get(u).find(e => e.target === v);

      if (edge) {
        return edge.data;
      }
    }
    return undefined;
  }

  removeNode(id) {
    if (this._nodes.has(id)) {
      this._nodes.delete(id);
      this._edges.delete(id);
      return true;
    }

    return false;
  }

  removeEdge(u, v) {
    if (this.isNode(u) && this.isNode(v)) {
      let index = this._edges.get(u).findIndex(e => e.target === v);
      this._edges.get(u).splice();

      if (index !== -1) {
        this._edges.get(u).splice(index, 1);
      }

      return true;
    }

    return false;
  }
}

module.exports = DirectedGraph;
