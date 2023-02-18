import { CamelToSpacedWordsPipe } from './camel-to-spaced-words.pipe';

describe('CamelToSpacedWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelToSpacedWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
