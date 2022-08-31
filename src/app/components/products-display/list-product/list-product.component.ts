import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductModel} from '../../../_models/product.model';
import {StatusModel} from '../../../_models/status.model';


@Component({
  selector: 'gog-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProductComponent {
  @Input() product!: ProductModel;
  @Input() inCart!: boolean;
  @Output() statusChange = new EventEmitter<void>();

  checkStatus(): StatusModel {
    if (this.product.owned) {
      return 'owned';
    } else if (this.inCart) {
      return 'cart';
    }
    return 'available';
  }

  changeStatus(): void {
    this.statusChange.emit();
  }

  hasDiscount(): boolean {
    return typeof this.product.discount === 'number';
  }
}
