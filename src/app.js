// @flow
import React, { Component } from 'react';
import trace, { Point, Plane, Sphere, Vector, Material, Color } from './tracer';
import type { Shape } from './tracer';
import SphereInputs from './inputs-sphere';
import StubbedInputs from './inputs-stub';

const floor = Plane.make(Point.make(0, 0, -2), Vector.make(0, 0, 1), Material.make(Color.make(100, 100, 100), 20));
const sphere1 = Sphere.make(Point.make(0, 0, 0), 2, Material.make(Color.make(50, 100, 150), 20));
const sphere2 = Sphere.make(Point.make(4, 5, 0), 2, Material.make(Color.make(150, 100, 50), 4));

type State = {|
  canvas: ?HTMLCanvasElement,
  shapes: Set<Shape>,
|};

class App extends Component<{||}, State> {
  state = {
    canvas: null,
    shapes: (new Set([
      floor,
      sphere1,
      sphere2,
    ]): Set<Shape>),
  };

  trace = () => {
    setTimeout(() => {
      const { canvas, shapes } = this.state;
      if (canvas) {
        trace(canvas, shapes);
      }
    });
  }

  handleCanvas = (canvasEl: ?HTMLCanvasElement) => {
    if (!canvasEl) { return; }

    // getting around flow type error -- thinks that canvasEl is nullable
    const canvas = canvasEl;

    this.setState(() => ({
      canvas,
    }), this.trace);
  };

  handleChangeShape = (s: Shape) => {
    console.log("ccchange shapessss");

    const { shapes } = this.state;
    const array = Array.from(shapes.values())
    const index = array.findIndex(x => x.id === s.id);
    array[index] = s;
    const newShapes = new Set(array);

    this.setState(() => ({
      shapes: newShapes,
    }), this.trace);
  }

  render() {
    const { shapes } = this.state;

    return (
      <div>
        <canvas
          ref={this.handleCanvas}
          width="800"
          height="450"
        />
        { Array.from(shapes.values()).map(shape => <ShapeForm key={shape.id} shape={shape} onChange={this.handleChangeShape} />) }
      </div>
    );
  }
}

const ShapeForm = ({
  shape,
  onChange,
}: {| shape: Shape, onChange: (shape: Shape) => any |}) => {
  if (shape instanceof Sphere) {
    return <SphereInputs shape={shape} key={shape.id} onChange={onChange} />;
  }

  return <StubbedInputs shape={shape} key={shape.id} />;
};

export default App;
