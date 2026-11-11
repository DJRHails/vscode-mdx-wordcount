const STRIPPERS = [
  /^---\n[\s\S]*?\n---\n/, // YAML frontmatter
  /^(?:```|~~~)[\s\S]*?^(?:```|~~~)\s*$/gm, // fenced code blocks
  /\$\$[\s\S]*?\$\$/g, // display maths
  /(?<!\\)\$[^$\n]+?(?<!\\)\$/g, // inline maths
  /^(?:import|export)\b.*(?:\n(?!\s*\n).*)*/gm, // ESM import/export statements
  /\{\/\*[\s\S]*?\*\/\}|<!--[\s\S]*?-->/g, // JSX and HTML comments
  /^\[\^[^\]]+\]:.*$/gm, // footnote definitions (the site's reading time skips them)
  /\[\^[^\]]+\]/g, // footnote references
  /`[^`\n]*`/g, // inline code
  /!\[[^\]]*\]\([^)]*\)/g, // images
  /<\/?[A-Za-z][^<>]*?\/?>/g, // JSX/HTML tags (children text is kept)
];
const LINK = /\[([^\]]*)\]\([^)]*\)/g; // [text](url) -> text
const EXPRESSION = /\{[^{}]*\}/g; // innermost JSX expression
const WORD = /[\p{L}\p{N}](?:[\p{L}\p{N}'’\-]|[.,](?=\p{N}))*/gu; // 0.189 and 1,000 are one word

function proseOf(source) {
  let text = source.replace(/\r\n/g, "\n");
  for (const pattern of STRIPPERS) text = text.replace(pattern, " ");
  text = text.replace(LINK, "$1");
  let previous;
  do {
    previous = text;
    text = text.replace(EXPRESSION, " ");
  } while (text !== previous);
  return text;
}

function countWords(source) {
  return (proseOf(source).match(WORD) ?? []).length;
}

module.exports = { countWords, proseOf };
