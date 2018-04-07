// @flow
import * as React from 'react';
import { Plane, Point, Vector, Color, Material } from './tracer';
import XyzInputs from './inputs-xyz';
import MaterialInputs from './inputs-material';

type Props = {|
  shape: Plane,
  onChange: (p: Plane) => any,
|};

class PlaneInputs extends React.Component<Props> {

  handleChangeOrigin = (point: Point) => {
    const { shape, onChange } = this.props;
    shape.origin = point;
    onChange(shape);
  };

  handleChangeNormal = (vector: Vector) => {
    const { shape, onChange } = this.props;
    shape.normal = vector.normalize();
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
        <h3>Plane</h3>
        <div>Origin: <XyzInputs value={origin} onChange={this.handleChangeOrigin} /></div>
        <div>Normal: <XyzInputs value={shape.normal} onChange={this.handleChangeNormal} /></div>
        <MaterialInputs mat={material} onChange={this.handleChangeMaterial} />
      </div>
    );
  }
}

export default PlaneInputs;
