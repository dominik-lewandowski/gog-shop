import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject, Subject, takeUntil} from 'rxjs';
import {ProductModel} from '../../_models/product.model';
import {ProductsStateService} from '../../state/products-state.service';


@Component({
  selector: 'gog-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsDisplayComponent implements OnInit, OnDestroy {
  products$ = new ReplaySubject<ProductModel[]>(1);
  private destroy$ = new Subject<void>();

  constructor(private state: ProductsStateService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.state.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.products$.next(products);
        this.cdr.markForCheck();
      });

    this.state.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy(): void {
    this.products$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeProductStatus(product: ProductModel): void {
    if (this.isInCart(product)) {
      this.state.removeFromCart(product);
    } else if (!product.owned) {
      this.state.addToCart(product);
    }
  }

  isInCart(product: ProductModel): boolean {
    return this.state.isInCart(product);
  }
}
