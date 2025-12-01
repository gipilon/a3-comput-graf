// mylib.js - small utility to generate a simple SVG from a key

function hashToColor(str) {
  // Produces a hex color from a string by simple hashing
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Convert hash to RGB
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;
  const toHex = (n) => ('0' + (n & 0xff).toString(16)).slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const lib = {
  // return a short svg string using the key content as label and color
  getSVG(key = 'demo') {
    const color = hashToColor(key);
    const text = escapeHtml(key);
    const width = 260;
    const height = 60;
    return `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${text}">\n` +
      `  <rect width="100%" height="100%" rx="8" fill="${color}"/>\n` +
      `  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#fff">${text}</text>\n` +
      `</svg>`;
  }
};

export default lib;
