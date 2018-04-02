// @flow
import React, { Component } from 'react';
import trace, { Point, Plane, Sphere, Vector, Material, Color } from './tracer';

const floor = Plane.make(Point.make(0, 0, -2), Vector.make(0, 0, 1), Material.make(Color.make(100, 100, 100), 20));
const sphere1 = Sphere.make(Point.make(0, 0, 0), 2, Material.make(Color.make(50, 100, 150), 20));
const sphere2 = Sphere.make(Point.make(4, 5, 0), 2, Material.make(Color.make(150, 100, 50), 4));
const shapes = new Set([floor, sphere1, sphere2]);

class App extends Component<{||}> {
  handleCanvas = (canvasEl: ?HTMLCanvasElement) => {
    if (!canvasEl) { return; }

    // getting around flow type error -- thinks that canvasEl is nullable
    const canvas = canvasEl;
    setTimeout(() => {
      trace(canvas, shapes);
    })
  };

  render() {
    return (
      <div>
        <canvas
          ref={this.handleCanvas}
          width="800"
          height="450"
        />
        <div>
          Sphere
          <form>
            <label> radius: <input type="number" value="2" /></label>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
