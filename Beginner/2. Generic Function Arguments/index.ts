const identity = <T>(a: T): T => {
  return a;
};
const mapArray = <T, U>(arr: T[], fn: (val: T) => U) => arr.map(fn);
