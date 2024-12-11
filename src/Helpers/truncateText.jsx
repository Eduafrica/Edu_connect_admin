export function truncateText(text, maxWords) {
    if (!text || typeof text !== "string" || maxWords <= 0) {
      return text; // Return the original text if invalid input or maxWords is non-positive
    }
  
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text; // Return the original text if it's within the word limit
    }
  
    return words.slice(0, maxWords).join(" ") + "...";
  }
  