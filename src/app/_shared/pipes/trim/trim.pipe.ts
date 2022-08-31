import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string | number, from = 23, replacement = '...'): string {
    const stringValue = value.toString();
    return stringValue.length < from
      ? stringValue
      : stringValue.substring(0, from - 3).trim() + replacement;
  }
}
