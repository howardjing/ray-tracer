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

  handleChangeRadius = (e: SyntheticInputEvent<>) => {
    const r = parseFloat(e.target.value);
    const { shape, onChange } = this.props;
    shape.radius = r;
    onChange(shape);
  };

  handleChangeMaterial = (material: Material) => {
    const { shape, onChange } = this.props;
    shape.material = material;
    onChange(shape);
  };

  render() {
    const { shape } = this.props;
    const { origin, material } = shape;

    return (
      <div style={{ margin: '20px' }}>
        <h3>Sphere</h3>
        <div>Origin: <PointInputs point={origin} onChange={this.handleChangePoint} /></div>
        <div>Radius: <input type="number" value={shape.radius} onChange={this.handleChangeRadius} /></div>
        <MaterialInputs mat={material} onChange={this.handleChangeMaterial} />
      </div>
    );
  }
}

class PointInputs extends React.Component<{| point: Point, onChange: (p: Point) => any |}> {
  handleChange = (e: SyntheticInputEvent<>, callback: (x: number) => Point) => {
    const { onChange } = this.props;
    const { value } = e.target;
    const point = value === "" ? callback(0) : callback(parseFloat(value));
    onChange(point);
  };

  handleChangeX = (e: SyntheticInputEvent<>) => {
    const { point } = this.props;
    this.handleChange(e, (value) => {
      point.x = value;
      return point;
    });
  };

  handleChangeY = (e: SyntheticInputEvent<>) => {
    const { point } = this.props;
    this.handleChange(e, (value) => {
      point.y = value;
      return point;
    });
  };

  handleChangeZ = (e: SyntheticInputEvent<>) => {
    const { point } = this.props;
    this.handleChange(e, (value) => {
      point.z = value;
      return point;
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

class MaterialInputs extends React.Component<{|
  mat: Material,
  onChange: (m: Material) => any,
|}> {

  handleChangeColor = (color: Color) => {
    const { mat, onChange }  = this.props;
    mat.color = color;
    onChange(mat);
  };

  handleChangeShiny = (e: SyntheticInputEvent<>) => {
    const { mat, onChange } = this.props;
    const shinyness = parseFloat(e.target.value);
    mat.shinyness = shinyness;
    onChange(mat);
  };

  render() {
    const { mat } = this.props;

    const { color, shinyness } = mat;
    return [
      <div key="color">Color: <ColorInputs color={color} onChange={this.handleChangeColor} /></div>,
      <div key="shiny">Shinyness: <input type="number" value={shinyness} onChange={this.handleChangeShiny} /></div>
    ];
  }
}

class ColorInputs extends React.Component<{| color: Color, onChange: (c: Color) => any |}> {
  handleChange = (e: SyntheticInputEvent<>, callback: (x: number) => Color) => {
    const { onChange } = this.props;
    const { value } = e.target;
    const color = value === "" ? callback(0) : callback(parseInt(value, 10));
    onChange(color);
  };

  handleChangeRed = (e: SyntheticInputEvent<>) => {
    const { color } = this.props;
    this.handleChange(e, (value) => {
      color.red = value;
      return color;
    });
  };

  handleChangeBlue = (e: SyntheticInputEvent<>) => {
    const { color } = this.props;
    this.handleChange(e, (value) => {
      color.blue = value;
      return color;
    });
  };

  handleChangeGreen = (e: SyntheticInputEvent<>) => {
    const { color } = this.props;
    this.handleChange(e, (value) => {
      color.green = value;
      return color;
    });
  };

  render() {
    const { color } = this.props;
    const { red, green, blue } = color;
    return (
      <span>
        (<input type="number" value={red} onChange={this.handleChangeRed} />,
        <input type="number" value={green} onChange={this.handleChangeGreen} />,
        <input type="number" value={blue} onChange={this.handleChangeBlue} />)
      </span>
    );
  }
}

export default SphereInputs;
