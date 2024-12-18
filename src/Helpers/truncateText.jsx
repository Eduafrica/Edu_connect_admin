export function truncateText(text, maxWords) {
    if (!text || typeof text !== "string" || maxWords <= 0) {
      return text; 
    }
  
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }
  
    return words.slice(0, maxWords).join(" ") + "...";
  }
  