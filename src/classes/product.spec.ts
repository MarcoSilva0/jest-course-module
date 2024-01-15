import { Product } from './Product';

const createSut = (name: string, price: number, quantity: number) => {
  return new Product(name, price, quantity);
};

describe('Products', () => {
  //Clean all mock after suit test
  afterEach(() => jest.clearAllMocks());

  it('should have properties name, price and quantity', () => {
    const sut = createSut('Camiseta', 49.9, 1);

    expect(sut).toHaveProperty('name', 'Camiseta');
    expect(sut.price).toBeCloseTo(49.9);
    expect(sut).toHaveProperty('quantity', 1);
  });
});
