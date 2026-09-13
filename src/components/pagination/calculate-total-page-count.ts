export const calculateTotalPageCount = (itemCount: number, itemsPerPage: number): number => {
  return Math.ceil(itemCount / itemsPerPage);
};
