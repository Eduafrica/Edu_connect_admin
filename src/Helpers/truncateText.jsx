export function truncateText(text, maxChars) {
  if (!text || typeof text !== "string" || maxChars <= 0) {
      return text;
  }

  if (text.length <= maxChars) {
      return text;
  }

  return text.slice(0, maxChars) + "...";
}


/**
 * export function truncateText(text, maxWords) {
    if (!text || typeof text !== "string" || maxWords <= 0) {
      return text; 
    }
  
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }
  
    return words.slice(0, maxWords).join(" ") + "...";
  }
  
 */

