import { MMAPage } from './app.po';

describe('mma App', () => {
  let page: MMAPage;

  beforeEach(() => {
    page = new MMAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
