// @flow
import * as React from 'react';
import { Sphere, Point, Color, Material } from './tracer';
import XyzInputs from './inputs-xyz';
import MaterialInputs from './inputs-material';

type Props = {|
  shape: Sphere,
  onChange: (s: Sphere) => any,
|};

class SphereInputs extends React.Component<Props> {

  handleChangeOrigin = (point: Point) => {
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
        <div>Origin: <XyzInputs value={origin} onChange={this.handleChangeOrigin} /></div>
        <div>Radius: <input type="number" value={shape.radius} onChange={this.handleChangeRadius} /></div>
        <MaterialInputs mat={material} onChange={this.handleChangeMaterial} />
      </div>
    );
  }
}

export default SphereInputs;
