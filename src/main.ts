/*
Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem
depender de abstrações.
Dependa de abstrações, não de implementações.
Abstrações não devem depender de detalhes. Detalhes devem depender
de abstrações.

Classes de baixo nível são classes que executam tarefas (os detalhes)
Classes de alto nível são classes que gerenciam as classes de baixo nível.
*/
import { Messaging } from './services/Messaging';
import { Order } from './classes/Order';
import { Persistency } from './services/Persistency';
import { Product } from './classes/Product';
import { ShoppingCart } from './classes/ShoppingCart';
import { NonePercentDiscount } from './classes/Discount';
import { EnterpriseCustomer, IndividualCustomer } from './classes/Customer';

const noneDiscount = new NonePercentDiscount();
const shoppingCart = new ShoppingCart(noneDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
// const individualCustomer = new IndividualCustomer('Marco', 'Silva', '111.111.111-11');
const enterpriseCustomer = new EnterpriseCustomer('Empresa do Marco', '111.111.111-11');
const order = new Order(shoppingCart, messaging, persistency, enterpriseCustomer);

shoppingCart.addItem(new Product('Shirt', 10.29, 1));
shoppingCart.addItem(new Product('Shoes', 39.12, 1));
shoppingCart.addItem(new Product('Hat', 1.99, 1));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
