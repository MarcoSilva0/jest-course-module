/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Order } from '../Order';
import { CartItem } from '../interfaces/cart-item';
import { CustomerOrder } from '../interfaces/customer-protocol';
import { MessagingProtocol } from '../interfaces/messaging-protocol';
import { PersistencyProtocol } from '../interfaces/persistency-protocol';
import { ShoppingCartProtocol } from '../interfaces/shopping-cart-protocol';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }
  addItem(item: CartItem): void {}
  removeItem(index: number): void {}
  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 2;
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void {}
}

class MessagingMock implements MessagingProtocol {
  sendMenssage(): void {}
}

class PersistentMock implements PersistencyProtocol {
  saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return '';
  }
  getIDN(): string {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistentMock = new PersistentMock();
  const customerMock = new CustomerMock();
  const sut = new Order(shoppingCartMock, messagingMock, persistentMock, customerMock);

  return { sut, shoppingCartMock, messagingMock, persistentMock };
};

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(true);

    sut.checkout();
    expect(shoppingCartMockSpy).toBeCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should not checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(false);

    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send an email to customer', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMenssage');

    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistentMock } = createSut();
    const persistentMockSpy = jest.spyOn(persistentMock, 'saveOrder');

    sut.checkout();
    expect(persistentMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');

    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
