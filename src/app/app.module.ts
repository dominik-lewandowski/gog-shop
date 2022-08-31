import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsDisplayComponent } from './components/products-display/products-display.component';
import { ListProductComponent } from './components/products-display/list-product/list-product.component';
import { CartProductComponent } from './components/cart/cart-product/cart-product.component';
import {TrimModule} from './_shared/pipes/trim/trim.module';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    CartComponent,
    ProductsDisplayComponent,
    ListProductComponent,
    CartProductComponent
  ],
  imports: [
    BrowserModule,
    TrimModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
