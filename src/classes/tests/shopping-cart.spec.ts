import { Discount } from '../Discount';
import { ShoppingCart } from '../ShoppingCart';
import { CartItem } from '../interfaces/cart-item';

const createSut = () => {
  const discountMockObj = createDiscountMock();
  const sut = new ShoppingCart(discountMockObj);
  return { sut, discountMockObj };
};

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createCartItem = (name: string, price: number, quantity: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number, public quantity: number) {}
  }

  return new CartItemMock(name, price, quantity);
};

const createSutWithProducts = () => {
  const { sut, discountMockObj } = createSut();
  const cartItem1 = createCartItem('Calça', 120, 1);
  const cartItem2 = createCartItem('Camiseta', 60, 1);
  sut.addItem(cartItem1);
  sut.addItem(cartItem2);
  return { sut, discountMockObj };
};

describe('ShoppingCart', () => {
  it('should be an empty cart when no products is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('should have 2 cart items', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  });

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(180);
    expect(sut.totalWithDiscount()).toBe(180);
  });

  it('should add products and clear cart', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should remove products', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should call discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMockObj } = createSutWithProducts();
    const discountMockObjSpy = jest.spyOn(discountMockObj, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockObjSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculate with totalPrice when totalWithDiscount is called', () => {
    const { sut, discountMockObj } = createSutWithProducts();
    const discountMockObjSpy = jest.spyOn(discountMockObj, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockObjSpy).toHaveBeenCalledWith(sut.total());
  });
});
