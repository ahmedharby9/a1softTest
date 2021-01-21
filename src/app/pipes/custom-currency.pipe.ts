import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  /* ***
    - the pipe is working on display a currency based on server formatting and
      using argument to rewrite value :
     *** */
  transform(value: unknown, ...args: unknown[]): unknown {
    /* pass arguments as object in first index */
    const options = args[0];
    let str = value;
    /* make sure if value is number or not */
    if (typeof value === 'number' && options) {
      /* convert number to decimal digits using arguments */
      str = this.decimal_digits(str, options['decimal_digits']);
      /* divide number into groups using arguments */
      str = this.group_separator(str, options['group_separator']);
      /* check if format arguments have display symbol or not */
      if (options['display_symbol']) {
        if (options['symbol_first'] && options['currency_symbol']) {
          /* add symbol before currency */
          str = `${options['currency_symbol']}${str}`;
        } else if (!options['symbol_first'] && options['currency_symbol']) {
          /* add symbol after currency */
          str = `${str}${options['currency_symbol']}`;
        } else {
          /* if didn't provide a symbol so display ISO code */
          str = `${options['iso_code']} ${str}`;
        }
      }
      return str;
    }
  }

  /* convert number to decimal digits using arguments */
  decimal_digits(num, end?): any {
    // const slic = num / Math.pow(10, 3);
    return num.toFixed(end);
  }

  /* divide number into groups using regular expressions   */
  group_separator(num, sym): any {
    const numParts = num.toString().split('.');
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sym);
    return numParts.join('.');
  }

}
