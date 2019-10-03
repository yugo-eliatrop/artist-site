export const handleLine = text =>
  text
    .replace(/\s{2,}/g, ' ')
    .replace(/^\s+|>|<|\s+$/g, '');

export const handleText = text =>
  text.split("\n").map(t => handleLine(t)).join("\n");
    