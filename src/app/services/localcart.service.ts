import { Injectable } from '@angular/core';

@Injectable()
export class LocalCartService {

  constructor(
  ) {
  }

  /**
   * clearAll()
   * Clears:
   * - localstorage.cart
   * - localstorage.order
   */
  public clearAll(): void {
    this.clearCart();
    this.clearOrder();
  }

  /**
   * clearCart()
   *
   * clears localstorage cart
   */
  public clearCart(): void {
    localStorage.setItem('cart', null);
  }

  /**
   * cartHasItems()
   * Returns boolean, if localstorage has items stored in cart.
   */
  public cartHasItems(): boolean {
    return (localStorage.getItem('cart') !== null);
  }

  /**
   * cartGetItems()
   * returns json object of all items in localstorage cart
   */
  public cartGetItems(): any {
    if (this.cartHasItems()) {
      let cart = localStorage.getItem('cart');
      cart = JSON.parse(cart);
      return cart;
    }
    return null;
  }

  /**
   * clearOrder()
   *
   * Clears localstorage order
   */
  public clearOrder(): void {
    localStorage.setItem('order', null);
  }

  /**
   * cartUpdateItems()
   * @param items - Items to store in localstorage cart
   */
  public cartUpdateItems(items: any): void {
    const itemStr = JSON.stringify(items);
    localStorage.setItem('cart', itemStr);
  }

  /**
   * orderHasItems()
   * * Returns boolean, if localstorage has items stored in order.
   */
  public orderHasItems(): boolean {
    return (localStorage.getItem('order') !== null && localStorage.getItem('order') !== 'null');
  }

  /**
   * orderHas()
   * @param key - string
   *
   * Returns boolean, if localstorage has {key} in order
   */
  public orderHas(key: string): boolean {
    if (this.orderHasItems() && key) {
      let order = localStorage.getItem('order');
      order = JSON.parse(order);
      return (order[key] !== null);
    }
    return false;
  }

  /**
   * orderGetItems()
   * returns json object of all items in localstorage order
   */
  public orderGetItems(): any {
    if (this.orderHasItems()) {
      let order = localStorage.getItem('order');
      order = JSON.parse(order);
      return order;
    }
    return null;
  }

  /**
   * orderUpdateItems()
   * @param items - Items to store in localstorage order
   */
  public orderUpdateItems(items: any): void {
    const itemStr = JSON.stringify(items);
    localStorage.setItem('order', itemStr);
  }

}
