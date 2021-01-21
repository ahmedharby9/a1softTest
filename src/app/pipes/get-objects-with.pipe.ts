import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'getObjectsWith'
})
export class GetObjectsWithPipe implements PipeTransform {
  /* ***
    - the pipe is working on display a extract a schema from array of objects and
      using two arguments to do that :
    @arguments
      [0] Exception keys -> the keys that you don't need the display on the table
      [1] Additional keys => the keys that you need to display on the table
     *** */
  transform(value: any, ...args: any[]): any {
    const exp = args[0];
    const inc = args[1] || [];
    const objKeys = [];
    Object.keys(value).forEach((e) => {
      if (!exp.includes(e)) {
        const incIndex = (inc.length > 0) ? inc.findIndex((k) => k.key === e) : -1;
        if (incIndex !== -1) {
          objKeys.push(inc[incIndex]);
        } else {
          const key = e.split('_');
          objKeys.push({name: key.length === 1 ? e : key.join(' '), key: e});
        }
      }
    });
    return objKeys;
  }

}
