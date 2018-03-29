// @flow
import React, { Component } from 'react';
import trace from './tracer';

class App extends Component<{||}> {
  handleCanvas = (canvas: ?HTMLCanvasElement) => {
    if (!canvas) { return; }

    trace(canvas);
  };

  render() {
    return (
      <canvas
        ref={this.handleCanvas}
        width="800"
        height="450"
      />
    );
  }
}

export default App;
