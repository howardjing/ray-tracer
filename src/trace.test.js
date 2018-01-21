// @flow
import { Point, Vector, ScreenToWorld } from './trace';

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
