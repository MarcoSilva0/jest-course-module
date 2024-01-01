import { CartItem } from './interfaces/cart-item';

export class Product implements CartItem {
  constructor(public name: string, public price: number, public quantity: number) {}
}
