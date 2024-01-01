import { Discount } from './Discount';
import { CartItem } from './interfaces/cart-item';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';

export class ShoppingCart implements ShoppingCartProtocol {
  constructor(private readonly discount: Discount) {}

  private readonly _items: CartItem[] = [];

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  total(): number {
    return +this._items.reduce((total, next) => total + next.price, 0).toFixed(2);
  }

  totalWithDiscount(): number {
    return this.discount.calculate(this.total());
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear(): void {
    console.log('Carrinho foi limpo');
    this._items.length = 0;
  }
}
