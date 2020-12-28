import { example, example2 } from '../src/index';

describe('example', () => {
  describe('#sum', () => {
    it('should sum parameters', () => {
      const result = example.sum(2, 3);
      result.should.equal(5);
    });
  });
});

describe('example2', () => {
  it('should return one when 1 is the argument', () => {
    const result = example2(1);
    result.should.equal('one');
  });

  it('should return other when the argument is not 1 neither 2', () => {
    const result = example2(3);
    result.should.equal('other');
  });
});
