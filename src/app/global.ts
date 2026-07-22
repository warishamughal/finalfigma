import { Injectable, signal, computed } from '@angular/core';
import { Product } from './interfaces'; // ✅ import

@Injectable({
  providedIn: 'root'
})
export class Global {

  private product: Product | null = null;
  private favProductsSignal = signal<Product[]>([]);
  private cartProductsSignal = signal<Product[]>([]);
  private orderData: any = null;

  favProducts = this.favProductsSignal.asReadonly();
  cartProducts = this.cartProductsSignal.asReadonly();

  cartCount = computed(() =>
    this.cartProductsSignal().reduce((sum, p) => sum + (p.quantity || 0), 0)
  );

  totalPrice = computed(() =>
    this.cartProductsSignal().reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0)
  );

  favCount = computed(() => this.favProductsSignal().length);

  constructor() {}

  setProduct(item: Product) { this.product = item; }
  getProduct(): Product | null { return this.product; }

  toggleFav(item: Product) {
    const current = this.favProductsSignal();
    const index = current.findIndex(f => f.name === item.name);
    if (index > -1) {
      this.favProductsSignal.set(current.filter(f => f.name !== item.name));
      item.isFavorite = false;
    } else {
      this.favProductsSignal.set([...current, { ...item, isFavorite: true }]);
      item.isFavorite = true;
    }
  }

  getFavProducts(): Product[] { return this.favProductsSignal(); }
  isFavorite(item: Product): boolean {
    return this.favProductsSignal().some(f => f.name === item.name);
  }

  addToCart(item: Product) {
    const current = this.cartProductsSignal();
    const index = current.findIndex(c => c.name === item.name);
    if (index === -1) {
      this.cartProductsSignal.set([...current, { ...item, quantity: 1 }]);
    } else {
      const updated = [...current];
      updated[index] = { ...updated[index], quantity: (updated[index].quantity || 0) + 1 };
      this.cartProductsSignal.set(updated);
    }
  }

  updateCartQuantity(name: string, quantity: number) {
    const current = this.cartProductsSignal();
    if (quantity <= 0) {
      this.cartProductsSignal.set(current.filter(c => c.name !== name));
    } else {
      this.cartProductsSignal.set(
        current.map(c => c.name === name ? { ...c, quantity } : c)
      );
    }
  }

  removeFromCart(item: Product) {
    this.cartProductsSignal.set(
      this.cartProductsSignal().filter(c => c.name !== item.name)
    );
  }

  getCartProducts(): Product[] { return this.cartProductsSignal(); }
  getCartCount(): number { return this.cartCount(); }

  setOrderData(data: any) { this.orderData = data; }
  getOrderData() { return this.orderData; }

  clearOrderData() {
    this.orderData = null;
    this.cartProductsSignal.set([]);
  }
}