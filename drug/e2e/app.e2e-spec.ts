import { DrugPage } from './app.po';

describe('drug App', () => {
  let page: DrugPage;

  beforeEach(() => {
    page = new DrugPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
