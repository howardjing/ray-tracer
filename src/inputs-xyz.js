// @flow
import * as React from 'react';

class XyzInputs<T: { x: number, y: number, z: number }> extends React.Component<{| value: T, onChange: (v: T) => any |}> {
  handleChange = (e: SyntheticInputEvent<>, callback: (a: number) => T) => {
    const { onChange } = this.props;
    const { value } = e.target;
    const changed = value === "" ? callback(0) : callback(parseFloat(value));
    onChange(changed);
  };

  handleChangeX = (e: SyntheticInputEvent<>) => {
    const { value } = this.props;
    // $ExpectError
    this.handleChange(e, (changed) => {
      value.x = changed;
      return value;
    });
  };

  handleChangeY = (e: SyntheticInputEvent<>) => {
    const { value } = this.props;
    // $ExpectError
    this.handleChange(e, (changed) => {
      value.y = changed;
      return value;
    });
  };

  handleChangeZ = (e: SyntheticInputEvent<>) => {
    const { value } = this.props;
    // $ExpectError
    this.handleChange(e, (changed) => {
      value.z = changed;
      return value;
    });
  };

  render() {
    const { value } = this.props;
    const { x, y , z } = value;
    return (
      <span>
        (<input type="number" value={x} onChange={this.handleChangeX} />,
        <input type="number" value={y} onChange={this.handleChangeY} />,
        <input type="number" value={z} onChange={this.handleChangeZ}/>)
      </span>
    );
  }
}

export default XyzInputs;
