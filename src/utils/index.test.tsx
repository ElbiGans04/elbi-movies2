import { formatDate, formatMoney } from '../utils';

test('formatDate formats a date correctly', () => {
  const date = '2023-01-15T14:30:00Z';
  const formattedDate = formatDate(date);
  expect(formattedDate).toBe('Jan, 15 2023');
});

test('formatMoney formats money correctly', () => {
  const money = 10000;
  const formattedMoney = formatMoney(money);
  expect(formattedMoney).toBe('10,000');
});