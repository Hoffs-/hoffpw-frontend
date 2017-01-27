import { HoffpwFrontendPage } from './app.po';

describe('hoffpw-frontend App', function() {
  let page: HoffpwFrontendPage;

  beforeEach(() => {
    page = new HoffpwFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
