import {SafeUrlPipe} from './safe-url.pipe';
import {DomSanitizerStub} from '../../testing/dom-sanitizer-stub';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    const domSanitizer = new DomSanitizerStub();
    const pipe = new SafeUrlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
