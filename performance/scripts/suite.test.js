import test01 from './swap.test.js';

export const options = {
  execution: {
    test1: {
      type: 'composite',
      exec: 'test01.default',
      options: test01.options,
    },
  },
};
