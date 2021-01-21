import {CustomCurrencyPipe} from './custom-currency.pipe';

describe('CustomCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
  it('should rewrite number to currency and the symbol after number', () => {
    const pipe = new CustomCurrencyPipe();

    expect(pipe.transform(12345678, {
      currency_symbol: '$',
      decimal_digits: 2,
      decimal_separator: '.',
      display_symbol: true,
      group_separator: ',',
      iso_code: 'USD',
    })).toBe('12,345,678.00$');
  });
  it('should rewrite number to currency and the symbol befor number', () => {
    const pipe = new CustomCurrencyPipe();
    expect(pipe.transform(12345678, {
      currency_symbol: '$',
      decimal_digits: 2,
      decimal_separator: '.',
      display_symbol: true,
      group_separator: ',',
      iso_code: 'USD',
      symbol_first: true
    })).toBe('$12,345,678.00');
  });
  it('should rewrite number to currency and the symbol befor number', () => {
    const pipe = new CustomCurrencyPipe();
    expect(pipe.transform(12345678, {
      display_symbol: true,
      decimal_digits: 2,
      decimal_separator: '.',
      group_separator: ',',
      iso_code: 'USD',
    })).toBe('USD 12,345,678.00');
  });
});
