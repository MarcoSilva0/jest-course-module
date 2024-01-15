import {
  Discount,
  FiftyPercentDiscount,
  NonePercentDiscount,
  TenPercentDiscount,
} from '../Discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  //Clean all mock after suit test
  afterEach(() => jest.clearAllMocks());

  it('should have no discount', () => {
    const sut = createSut(NonePercentDiscount);
    expect(sut.calculate(10.99)).toBeCloseTo(10.99);
  });

  it('should apply 50% discount on price', () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(100.5)).toBeCloseTo(50.25);
  });

  it('should apply 10% discount on price', () => {
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(10)).toBeCloseTo(9);
  });
});
