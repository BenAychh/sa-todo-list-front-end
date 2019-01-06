import { Selector } from 'testcafe';
import { config } from './config';

fixture('Basic Test Cafe Test').page(config.baseUrl);

test('shows initial angular page', async (t) => {
  const headerSelector = 'h1';

  await t.resizeWindow(1366, 768);

  await t.expect(Selector(headerSelector)).ok();
});
