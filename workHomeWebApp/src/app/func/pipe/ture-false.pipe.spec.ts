import {TrueFalsePipe} from './true-false.pipe';

describe('TrueFalseTest', () => {
  it('create an instance', () => {
    const pipe = new TrueFalsePipe();
    expect(pipe.transform(false)).toEqual('否');
    expect(pipe.transform(true)).toEqual('是');
    expect(pipe.transform(null)).toEqual('-');
    expect(pipe.transform(undefined)).toEqual('-');
    expect(pipe).toBeTruthy();
  });
});
