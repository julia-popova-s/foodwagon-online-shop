export const getPartOfString = (text: string, count: number) => {
  if (text?.length > count) {
    return `${text.slice(0, count - 1)}...`;
  }
  return text;
};
