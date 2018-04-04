// @flow
import React from 'react';
import { Sphere, Point, Color, Material } from './tracer';

type Props = {|
  shape: Sphere,
|};

const SphereInputs = ({ shape }: Props) => {
  const { origin, material } = shape;
  return (
    <div style={{ margin: '20px' }}>
      <div>Origin: <PointInputs point={origin} /></div>
      <div>Radius: <input type="number" value={shape.radius} /></div>
      <MaterialInputs mat={material} />
    </div>
  );
};

const PointInputs = ({ point }: { point: Point }) => {
  const { x, y , z } = point;
  return (
    <span>
      (<input type="number" value={x} />,
      <input type="number" value={y} />,
      <input type="number" value={z} />)
    </span>
  );
};

const MaterialInputs = ({ mat }: { mat: Material }) => {
  const { color, shinyness } = mat;
  return [
    <div key="color">Color: <ColorInputs color={color} /></div>,
    <div key="shiny">Shinyness: <input type="number" value={shinyness} /></div>
  ]
}

const ColorInputs = ({ color }: { color: Color }) => {
  const { red, green, blue } = color;
  return (
    <span>
      rgb(<input type="number" value={red} />,
      <input type="number" value={green} />,
      <input type="number" value={blue} />)
    </span>
  );
};

export default SphereInputs;
