// @flow
import quadraticSolver from './quadratic-solver';

declare var describe: any;
declare var it: any;
declare var expect: any;

describe('quadraticSolver', () => {
  it('returns no roots when determinant < 0', () => {
    expect(quadraticSolver(1, -3, 4)).toEqual([]);
  });

  it('returns one root when determinant === 0', () => {
    expect(quadraticSolver(-4, 12, -9)).toEqual([1.5]);
  });

  it ('returns two roots when determinant > 0', () => {
    expect(new Set(quadraticSolver(1, 3, -4))).toEqual(new Set([1, -4]));
  });
});
