// @flow

/**
 * given a number of possibilities n, returns a random integer
 * from [0, n)
 */
const random = (possibilities: number): number =>
  Math.floor(Math.random() * possibilities);

const toArray = (a: { x: number, y: number, z: number }) => [a.x, a.y, a.z];

const magnitude = (xs: number[]): number =>
  Math.sqrt(xs.reduce((accum, i) => accum + Math.pow(i, 2), 0));

const normalize = (xs: number[]): number[] => {
  const m = magnitude(xs);
  if (m === 0) { throw new Error("can't normalize 0 vector"); }

  return xs.map(x => x / m);
}

class Point {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static make(x: number, y: number, z: number) {
    return new this(x, y, z);
  }
}

class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static make(x: number, y: number, z: number) {
    return new this(x, y, z);
  }

  magnitude = () => {
    return magnitude(toArray(this));
  }

  normalize = () => {
    return this.constructor.make(...normalize(toArray(this)));
  }

  toArray = () => toArray(this);
}

/**
 * Going with these conventions:
 *
 * xyz right handed cartesian coordinate system
 *
 *   * x increases as you go to the right
 *   * y increases as you go forwards
 *   * z increases as you jump / increase altitude
 *
 */
const trace = (canvas: HTMLCanvasElement) => {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d');

  /**
   * for each pixel p in the canvas, shoot a ray r from origin c that intersects with p.
   */
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      ctx.fillStyle = `rgb(${random(256)},${random(256)},${random(256)})`;
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

export default trace;

export {
  Vector,
};
