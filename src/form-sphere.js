// @flow
import React from 'react';
import { Sphere } from './tracer';

type Props = {|
  shape: Sphere,
|};

const SphereForm = ({ shape }: Props) => {
  return (
    <div>Radius: {shape.radius}</div>
  );
};

export default SphereForm;
