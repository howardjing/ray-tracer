// @flow
import React from 'react';
import type { Shape } from './tracer';

type Props = {|
  shape: Shape,
|};

const StubbedInputs = ({ shape }: Props) => {
  return (
    <div style={{ margin: '20px' }}>
      Stubby stub stub.
    </div>
  );
};

export default StubbedInputs;
