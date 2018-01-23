// @flow

const determinant = (a: number, b: number, c: number): number => Math.pow(b, 2) - 4 * a * c;

/**
 * given ax^2 + bx + c,
 * x = (-b +- sqrt(b^2 - 4ac)) / 2a
 *
 * This will return an array of 2 roots, 1 root, or 0 roots
 */
const quadraticSolver = (a: number, b: number, c: number): number[] => {
  const det = determinant(a, b, c);
  if (det < 0) {
    // imaginary numbers, return empty array
    return [];
  }

  if (det === 0) {
    return [-b / (2 * a)];
  }

  const sqrtDet = Math.sqrt(det);
  const root1 = (-b + sqrtDet) / (2 * a);
  const root2 = (-b - sqrtDet) / (2 * a);

  return [root1, root2];
};

export default quadraticSolver;
