/**
 * @param startDate birth date
 * @param endDate current date or death day
 */
export const countAge = (startDate: string, endDate?: string) => {
  const start = new Date(startDate).getTime();
  const end = (endDate ? new Date(endDate) : new Date()).getTime();

  const age = new Date(end - start);

  return age.getUTCFullYear() - 1970;
};
