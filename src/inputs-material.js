// @flow
import * as React from 'react';
import type { Material, Color } from './tracer';

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

export default MaterialInputs;
