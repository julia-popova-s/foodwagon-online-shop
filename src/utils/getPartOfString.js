export const getPartOfString = (text, count) => {
  if (text.length > count) {
    return `${text.slice(0, count - 1)}...`
  }
  return text
}
