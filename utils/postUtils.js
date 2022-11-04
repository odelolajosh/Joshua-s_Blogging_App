
/**
 * @param {string} text - The text to be posted
 * @returns {number} The approximate time in minutes it will take to read the text
 */
exports.getReadTime = (text) => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
}