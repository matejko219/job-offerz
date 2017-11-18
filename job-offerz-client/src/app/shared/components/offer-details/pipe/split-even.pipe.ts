import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitEven'
})
export class SplitEvenPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const odd = value.filter((value, index) => index % 2 !== 0);
      const even = value.filter((value, index) => index % 2 === 0);
      return [{odd, even}];
    }
  }

}
