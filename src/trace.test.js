// @flow
import { Vector } from './trace';

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
