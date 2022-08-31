import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductModel} from '../../../_models/product.model';


@Component({
  selector: 'gog-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartProductComponent {
  @Input() product!: ProductModel;
  @Output() removeProduct = new EventEmitter<void>();
  shouldShowRemove = false;

  showRemove(): void {
    this.shouldShowRemove = true;
  }

  hideRemove(): void {
    this.shouldShowRemove = false;
  }

  doRemove(): void {
    this.removeProduct.emit();
  }
}
