class Polygon {
  constructor(coordinates) {
    this._vertices = [];
    for (var i = 0; i < coordinates.length - 1; i = i + 2) {
      this._vertices.push({x: coordinates[i], y: coordinates[i + 1]})
    }
  }

  get vertices() {
    return this._vertices;
  }

  getConvexVertices() {
    let result = [];
    for (let i = 0; i < this.vertices.length; i++) {
      if (this._isVertexConvex(i)) {
        result.push(i);
      }
    }

    return result;
  }

  lineOfSight(pointA, pointB) {
    let visible = true;
    for (let k = 0; k < this._vertices.length; k++) {
      if (this._segmentsCross(pointA, pointB, this._vertices[k], this._vertices[(k + 1) % this._vertices.length])) {
        visible = false;
      }
    }

    return visible;
  }

  _isVertexConcave(vertex) {
    if (this._vertices && vertex < this._vertices.length) {
      let cur  = this._vertices[vertex];
      let next = this._vertices[(vertex + 1) % this._vertices.length];
      let prev = this._vertices[vertex == 0 ? this._vertices.length - 1 : vertex - 1];

      return (cur.x - prev.x) * (next.y - cur.y) - (cur.y - prev.y) * (next.x - cur.x) < 0;
    }

    return false;
  }

  _isVertexConvex(vertex) {
    return !this._isVertexConcave(vertex);
  }

  _segmentsCross(a, b, c, d)
  {
    let denominator = ((b.x - a.x) * (d.y - c.y)) - ((b.y - a.y) * (d.x - c.x));

    if (denominator === 0)
    {
      return false;
    }

    let numerator1 = ((a.y - c.y) * (d.x - c.x)) - ((a.x - c.x) * (d.y - c.y));
    let numerator2 = ((a.y - c.y) * (b.x - a.x)) - ((a.x - c.x) * (b.y - a.y));

    if (numerator1 === 0 || numerator2 === 0)
    {
      return false;
    }

    let r = numerator1 / denominator;
    let s = numerator2 / denominator;

    return (r > 0 && r < 1) && (s > 0 && s < 1);
  }
}

module.exports = Polygon;
