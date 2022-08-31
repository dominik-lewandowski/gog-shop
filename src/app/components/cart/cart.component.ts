import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit
} from '@angular/core';
import {first, map, Observable, ReplaySubject, Subject, takeUntil} from 'rxjs';
import {ProductModel} from '../../_models/product.model';
import {ProductsStateService} from '../../state/products-state.service';


@Component({
  selector: 'gog-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, OnDestroy {
  cartOpen = false;
  cartProducts$ = new ReplaySubject<ProductModel[]>(1);
  count$ = new ReplaySubject<number>(1);
  private destroy$ = new Subject<void>();

  constructor(private state: ProductsStateService,
              private cdr: ChangeDetectorRef,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.state.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.cartProducts$.next([...products]);
        this.count$.next(products.size);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.cartProducts$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  openCart(): void {
    this.cartOpen = true;
  }

  closeCart(): void {
    this.cartOpen = false;
  }

  clearCart(): void {
    this.state.clearCart();
  }

  removeProduct(product: ProductModel): void {
    this.state.removeFromCart(product);
    setTimeout(() => {
      if (!this.el.nativeElement.matches(':hover')) {
        this.cartOpen = false;
        this.cdr.markForCheck();
      }
    });
  }

  finalPrice$(): Observable<number> {
    return this.cartProducts$
      .pipe(
        first(),
        map(products => products.reduce((prev, curr) => prev + curr.price, 0))
      );
  }
}
