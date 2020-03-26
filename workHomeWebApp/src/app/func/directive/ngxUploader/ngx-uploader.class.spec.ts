import { humanizeBytes } from './ngx-uploader.class';


describe('isContentTypeAllowed function', () => {
  it('should return true', () => {

  });

  it('should return true', () => {

  });

  it('should return false', () => {

  });
});

describe('allContentTypesAllowed function', () => {
  it('should return true', () => {

  });

  it('should return false', () => {

  });
});

describe('humanizeBytes function', () => {
  it('should return 0 Bytes', () => {
    expect(humanizeBytes(0)).toEqual('0 Byte');
  });

  it('should return 1 KB', () => {
    expect(humanizeBytes(1024)).toEqual('1 KB');
  });

  it('should return 1.5 KB', () => {
    expect(humanizeBytes(1536)).toEqual('1.5 KB');
  });

  it('should return 1.75 KB', () => {
    expect(humanizeBytes(1792)).toEqual('1.75 KB');
  });

  it('should return 2 KB', () => {
    expect(humanizeBytes(2048)).toEqual('2 KB');
  });

  it('should return 1 MB', () => {
    expect(humanizeBytes(1048576)).toEqual('1 MB');
  });

  it('should return 1 GB', () => {
    expect(humanizeBytes(1073741824)).toEqual('1 GB');
  });

  it('should return 1 TB', () => {
    expect(humanizeBytes(1099511627776)).toEqual('1 TB');
  });

  it('should return 1 PB', () => {
    expect(humanizeBytes(1125899906842624)).toEqual('1 PB');
  });
});
