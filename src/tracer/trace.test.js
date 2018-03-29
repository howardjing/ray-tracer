// @flow
import { Point, Vector, ScreenToWorld, reflectVector } from './trace';

declare var describe: any;
declare var it: any;
declare var expect: any;

describe('Vector', () => {
  describe('magnitude', () => {
    it('works', () => {
      expect(Vector.make(3, 4, 5).magnitude()).toEqual(Math.sqrt(9 + 16 + 25));
    });
  });

  describe('normalize', () => {
    it("doesn't touch unit vector", () => {
      expect(Vector.make(1, 0, 0).normalize().toArray()).toEqual(Vector.make(1, 0, 0).toArray());
    });

    it("returns vector with magnitude of 1", () => {
      expect(Vector.make(1, 2, 3).normalize().magnitude()).toEqual(1);
    });
  });

  describe('crossProduct', () => {
    it("returns the cross product", () => {
      // http://onlinemschool.com/math/practice/vector3/multiply1/
      expect(Vector.make(16, 6, -9).crossProduct(Vector.make(-12, -9, 12)).toArray()).toEqual(
        Vector.make(-9,-84,-72).toArray(),
      );
    });
  })
});

describe('ScreenToWorld', () => {
  describe('constructor', () => {
    it('finds world max height', () => {
      const screenToWorld = new ScreenToWorld(800, 600, 10);
      expect(screenToWorld.worldMaxHeight).toEqual(7.5);
    });
  });

  describe('getPoint', () => {
    it('returns appropriate world coordinates', () => {
      const screenToWorld = new ScreenToWorld(800, 600, 10);

      expect(screenToWorld.getPoint(0, 0).toArray()).toEqual(Point.make(
        -5, 0, 3.75,
      ).toArray());

      expect(screenToWorld.getPoint(799, 599).toArray()).toEqual(Point.make(
        5, 0, -3.75,
      ).toArray());
    });
  })
});

describe('reflectVector', () => {
  it('works', () => {
    const sqrt3 = Math.sqrt(3)
    const light = Vector.make(1/sqrt3, 1/sqrt3, 1/sqrt3);
    const norm = Vector.make(0, 0, 1);
    const reflection = Vector.make(-1/sqrt3, -1/sqrt3, 1/sqrt3);
    expect(reflectVector(light, norm).toArray()).toEqual(reflection.toArray());
  });
});
