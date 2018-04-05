// @flow
import * as React from 'react';
import { Sphere, Point, Color, Material } from './tracer';

type Props = {|
  shape: Sphere,
  onChange: (s: Sphere) => any,
|};

class SphereInputs extends React.Component<Props> {

  handleChangePoint = (point: Point) => {
    const { shape, onChange } = this.props;
    shape.origin = point;
    onChange(shape);
  };

  render() {
    const { shape } = this.props;
    const { origin, material } = shape;

    return (
      <div style={{ margin: '20px' }}>
        <div>Origin: <PointInputs point={origin} onChange={this.handleChangePoint}/></div>
        <div>Radius: <input type="number" value={shape.radius} /></div>
        <MaterialInputs mat={material} />
      </div>
    );
  }
}

class PointInputs extends React.Component<{| point: Point, onChange: (p: Point) => any |}> {
  handleChange = (e: SyntheticInputEvent<>, callback: (x: number) => any) => {
    const { onChange, point } = this.props;
    const { value } = e.target;
    if (value === "") {
      callback(0);
    } else {
      callback(parseFloat(value))
    }
    onChange(point);
  };

  handleChangeX = (e: SyntheticInputEvent<>) => {
    const { point } = this.props;
    this.handleChange(e, (value) => {
      point.x = value;
    });
  };

  handleChangeY = (e: SyntheticInputEvent<>) => {
    const { point } = this.props;
    this.handleChange(e, (value) => {
      point.y = value;
      console.log("POINT", point)
    });
  };

  handleChangeZ = (e: SyntheticInputEvent<>) => {
    const { point } = this.props;
    this.handleChange(e, (value) => {
      point.z = value;
    });
  };

  render() {
    const { point } = this.props;
    const { x, y , z } = point;
    return (
      <span>
        (<input type="number" value={x} onChange={this.handleChangeX} />,
        <input type="number" value={y} onChange={this.handleChangeY} />,
        <input type="number" value={z} onChange={this.handleChangeZ}/>)
      </span>
    );
  }
}

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
