import {NgModule} from '@angular/core';
import {TrimPipe} from './trim.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    TrimPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrimPipe
  ]
})
export class TrimModule {
}
