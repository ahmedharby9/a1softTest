import {GetObjectsWithPipe} from './get-objects-with.pipe';

describe('GetObjectsWithPipe', () => {
  it('create an instance', () => {
    const pipe = new GetObjectsWithPipe();
    expect(pipe).toBeTruthy();
  });
  it('should extract schema from source data ', () => {
    const pipe = new GetObjectsWithPipe();
    expect(pipe.transform({id: 1, name: 'test', value: 'test', payee: 'test'}, ['name'],
      [{name: 'Payee', key: 'payee', format: 'data'}, {key: 'value'}]).length).toBe(3);
  });
  it('should extract schema from source data without additional prop ', () => {
    const pipe = new GetObjectsWithPipe();
    expect(pipe.transform({id: 1, name: 'test', value: 'test', payee: 'test'}, ['name']).length).toBe(3);
  });
  it('should extract schema from source data with underscore naming  ', () => {
    const pipe = new GetObjectsWithPipe();
    expect(pipe.transform({id: 1, form_name: 'test', value: 'test', payee: 'test'}, ['name']).length).toBe(4);
  });
});
