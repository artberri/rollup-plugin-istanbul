export const example = {
  sum (a, b) {
    return a + b;
  },

  subtract (a, b) {
    return a - b;
  }
};

export const example2 = foo => {
  if (foo === 1) {
    return 'one';
  }

  if (foo === 2) {
    return 'two';
  }

  return 'other';
};
