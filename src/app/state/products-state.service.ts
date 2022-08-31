import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductModel} from '../_models/product.model';

const MOCK_PRODUCTS: ProductModel[] = [
  {
    id: 1,
    title: 'oddworld: stranger’s wrath',
    thumbnail: 'assets/images/product_1.png',
    price: 9.99,
    owned: false,
    discount: 50
  },
  {
    id: 2,
    title: 'chaos on deponia',
    thumbnail: 'assets/images/product_2.png',
    price: 9.99,
    owned: true
  },
  {
    id: 3,
    title: 'The settlers 2: gold edition',
    thumbnail: 'assets/images/product_3.png',
    price: 5.99,
    owned: false
  },
  {
    id: 4,
    title: 'neverwinter nights',
    thumbnail: 'assets/images/product_4.png',
    price: 9.99,
    owned: false,
    discount: 50
  },
  {
    id: 5,
    title: 'assassin’s creed: director’s cut',
    thumbnail: 'assets/images/product_5.png',
    price: 9.99,
    owned: false
  }
];


@Injectable({
  providedIn: 'root'
})
export class ProductsStateService {
  private _products$ = new BehaviorSubject<ProductModel[]>(MOCK_PRODUCTS);
  private _cart$ = new BehaviorSubject<Set<ProductModel>>(new Set());
  private _cartSnapshot: Set<ProductModel> = new Set();

  addToCart(product: ProductModel): void {
    this._cartSnapshot.add(product);
    this._cart$.next(this._cartSnapshot);
  }

  removeFromCart(product: ProductModel): void {
    this._cartSnapshot.delete(product);
    this._cart$.next(this._cartSnapshot);
  }

  clearCart(): void {
    this._cartSnapshot = new Set();
    this._cart$.next(new Set());
  }

  isInCart(product: ProductModel): boolean {
    return this._cartSnapshot.has(product);
  }

  get products$(): Observable<ProductModel[]> {
    return this._products$.asObservable();
  }

  get cart$(): Observable<Set<ProductModel>> {
    return this._cart$.asObservable();
  }
}
