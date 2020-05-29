import { StatusPipe} from './status.pipe';

describe('StatusPipeTest', () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe.transform(0)).toEqual('未评阅');
    expect(pipe.transform(1)).toEqual('评阅中');
    expect(pipe.transform(2)).toEqual('已评阅');
    expect(pipe.transform(null)).toEqual('-');
    expect(pipe.transform(undefined)).toEqual('-');
    expect(pipe).toBeTruthy();
  });
});
