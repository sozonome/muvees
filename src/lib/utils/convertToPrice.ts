/**
 * convert number to price with currency string
 * @param num valuation number
 */
export const convertToPrice = (num: number): string => {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};
