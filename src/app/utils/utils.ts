/**
 * function to extract item Id from url
 * @param url
 * @returns item identifier as integer
 */
export const getIdFromUrl = (url: string): number => {
  url = url.slice(0, url.length - 1);
  return parseInt(url.split('/').pop() || '-1');
};
