import { CircusScroll2Page } from './app.po';

describe('circus-scroll2 App', function() {
  let page: CircusScroll2Page;

  beforeEach(() => {
    page = new CircusScroll2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
