import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberArray',
})
export class NumberArrayPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): number[] {
    let res = [];
    if (value) {
      for (let i = 0; i < value; i++) {
        res.push(i);
      }
    }
    return res;
  }
}
