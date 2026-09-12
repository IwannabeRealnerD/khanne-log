export const calculateTotalPageCount = (itemCount: number, itemsPerPage: number) => {
  return Math.ceil(itemCount / itemsPerPage);
};
