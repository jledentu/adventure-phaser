class Graph {
  constructor() {
    this._nodes = new Map();
    this._edges = new Map();
  }

  addNode(id, data) {
    this._nodes.set(id, data);
    this._edges.set(id, []);
  }

  addEdge(u, v, p, data) {
    if (this.isNode(u) && this.isNode(v)) {
      this._edges.get(u).push({target: v, p: p, data: data});
      this._edges.get(v).push({target: u, p: p, data: data});
    }
  }

  isNode(id) {
    return this._nodes.has(id);
  }

  isEdge(u, v) {
    return this.isNode(u) && this.isNode(v) && this._edges.get(u).find(e => e.target === v);
  }

  removeNode(id) {
    if (this._nodes.has(id)) {
      this._nodes.delete(id);
    }

    if (this._edges.has(id)) {
      this._edges.delete(id);
    }
  }

  removeEdge(u, v) {
    if (this.isNode(u) && this.isNode(v)) {
      let index = this._edges.get(u).findIndex(e => e.target === v);
      this._edges.get(u).splice();

      if (index !== -1) {
        this._edges.get(u).splice(index, 1);
      }

      index = this._edges.get(v).findIndex(e => e.target === u);

      if (index !== -1) {
        this._edges.get(v).splice(index, 1);
      }
    }
  }
}

module.exports = Graph;
