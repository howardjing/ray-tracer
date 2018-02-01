// @flow
import quadraticSolver from './quadratic-solver';

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
};

const add = (xs: number[], ys: number[]): number[] => {
  if (xs.length != ys.length) {
    throw new Error(`cannot add array, dimension mismatch: ${xs.length} and ${ys.length}`);
  }

  return xs.map((x, i) => x + ys[i]);
};

/**
 * NOTE: not sure if inverting xs and ys was the correct decision. My thought was that
 * translating 5 - 3 to subtract(5, 3) was more natural than subtract(3, 5).
 *
 * However, this is the only operation where I've inverted ys and xs.
 */
const subtract = (ys: number[], xs: number[]): number[] => {
  if (ys.length != xs.length) {
    throw new Error(`cannot subtract arrays, dimension mismatch: ${ys.length} and ${xs.length}`);
  }

  return ys.map((y, i) => y - xs[i]);
};

const multiply = (xs: number[], y: number): number[] =>
  xs.map(x => x * y);

const dotProduct = (xs: number[], ys: number[]): number => {
  if (xs.length != ys.length) {
    throw new Error(`cannot take dot product, dimension mismatch: ${xs.length} and ${ys.length}`);
  }

  return xs
    .map((x, i) => x * ys[i])
    .reduce((accum, product) => accum + product, 0);
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

  addVector = (that: Vector): Point => Point.make(...add(toArray(this), toArray(that)));

  subtract = (that: Point): Vector => Vector.make(...subtract(toArray(this), toArray(that)));

  toArray = () => toArray(this);
}

/**
 * Determinant of a 2x2 matrix.
 *
 * |a b|
 * |c d|
 */
const determinant2x2 = (a: number, b: number, c: number, d: number): number => {
  return a * d - b * c;
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

  magnitude = (): number=> {
    return magnitude(toArray(this));
  }

  normalize = (): Vector => {
    return this.constructor.make(...normalize(toArray(this)));
  }

  multiplyScalar = (scalar: number): Vector => Vector.make(...multiply(toArray(this), scalar));

  dotProduct = (that: Vector): number => dotProduct(toArray(this), toArray(that));

  /**
   * Determinant of a 3x3 matrix.
   *
   * |i   j  k|
   * |a1 a2 a3|
   * |b1 b2 b3|
   *
   * where this is the a vector and that is the b vector
   */
  crossProduct = (that: Vector): Vector => {
    return Vector.make(
      determinant2x2(this.y, this.z, that.y, that.z),
      -determinant2x2(this.x, this.z, that.x, that.z),
      determinant2x2(this.x, this.y, that.x, that.y),
    );
  }

  toArray = () => toArray(this);
}

class Ray {
  origin: Point;
  direction: Vector;

  constructor(origin: Point, end: Point) {
    this.origin = origin;
    this.direction = end.subtract(origin).normalize();
  }

  static make(origin: Point, end: Point) {
    return new this(origin, end);
  }
}

class Sphere {
  origin: Point;
  radius: number;

  constructor(origin: Point, radius: number) {
    this.origin = origin;
    this.radius = radius;
  }

  static make(origin: Point, radius: number) {
    return new this(origin, radius);
  }

  /**
   * Assuming the ray is normalized, then when solving the quadratic formula where
   *
   * a = dotProduct(rayDirection, rayDirection) = 1
   * b = 2 * rayDirection * (originRay - originSphere)
   * c = (originRay - originSphere)^2 - radius^2
   *
   * we find valid solutions, then the ray intersects with the sphere
   *
   * https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection
   */
  intersect = (ray: Ray): ?Point => {
    const difference = ray.origin.subtract(this.origin);

    // TODO: assuming ray.direction is normalized, this will always be 1
    const a = ray.direction.dotProduct(ray.direction);
    const b = ray.direction.multiplyScalar(2).dotProduct(difference);
    const c = difference.dotProduct(difference) - Math.pow(this.radius, 2);

    // possible root intersection points
    const roots = quadraticSolver(a, b, c);

    // we want the smallest root
    if (roots.length === 0) { return null; }
    const minRoot = Math.min(...roots);

    return ray.origin.addVector(ray.direction.multiplyScalar(minRoot));
  }

  normalVector = (p: Point): Vector => {
    return p.subtract(this.origin).normalize();
  }
}

class ScreenToWorld {
  screenMaxWidth: number;
  screenMaxHeight: number;
  worldMaxWidth: number;
  worldMaxHeight: number;

  constructor(screenMaxWidth: number, screenMaxHeight: number, worldMaxWidth: number) {
    this.screenMaxWidth = screenMaxWidth;
    this.screenMaxHeight = screenMaxHeight;
    this.worldMaxWidth = worldMaxWidth;
    const scale = worldMaxWidth / screenMaxWidth;
    this.worldMaxHeight = scale * screenMaxHeight;
  }

  /**
   * given screen coordinates, return a world coordinate
   */
  getPoint = (screenWidth: number, screenHeight: number): Point => {
    const percentWidth = screenWidth / (this.screenMaxWidth - 1);
    const percentHeight = screenHeight / (this.screenMaxHeight - 1);
    const worldWidth = percentWidth * this.worldMaxWidth - (this.worldMaxWidth / 2);
    const worldHeight = (this.worldMaxHeight / 2) - percentHeight * this.worldMaxHeight;
    return Point.make(worldWidth, 0, worldHeight);
  }
}

/**
 * Going with these conventions:
 *
 * xyz right handed cartesian coordinate system
 *
 *   * x increases as you go to the right
 *   * y increases as you go forwards
 *   * z increases as you jump / increase altitude
 */
const trace = (canvas: HTMLCanvasElement) => {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ctx = canvas.getContext('2d');

  /**
   * Where the camera sits.
   *
   * TODO: make origin parameterizable
   */
  const origin = Point.make(0, -10, 0);
  const sphere = Sphere.make(Point.make(0, 0, 0), 2);
  const screenToWorld = new ScreenToWorld(canvasWidth, canvasHeight, 10);

  /**
   * For each pixel p in the canvas, shoot a ray r from origin that intersects with p.
   *
   * Let's assume the canvas is a rectangle with width 10 centered at (0, 0, 0) along the x-z plane.
   * TODO: the rectangle should be a function of some sort of camera / fov / look at vector
   */
  for (let i = 0; i < canvasWidth; i++) {
    for (let j = 0; j < canvasHeight; j++) {
      const ray = Ray.make(origin, screenToWorld.getPoint(i, j));
      if (sphere.intersect(ray)) {
        ctx.fillStyle = `rgb(${random(256)},${random(256)},${random(256)})`;
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
}

export default trace;

export {
  Point,
  Vector,
  ScreenToWorld,
};
