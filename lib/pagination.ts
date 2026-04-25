export const getPageNumbers = (page: number, totalPages: number) => {
  const pages: (number | string)[] = [];
  const showNear = 3;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - showNear && i <= page + showNear)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return pages;
};
