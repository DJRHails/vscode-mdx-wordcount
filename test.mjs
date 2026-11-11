import assert from "node:assert/strict";
import { createRequire } from "node:module";
const { countWords } = createRequire(import.meta.url)("./count.js");

const cases = [
  ["", 0],
  ["---\ntitle: Ignore me please\n---\nHello world", 2],
  ["import X from 'y';\nimport {\n  A,\n} from 'b'\n\nOne two", 2],
  ["Some <Sparkles client:idle>reasonable</Sparkles> lump", 3],
  ["Cost $\\pounds 9.13$ each\n$$\nx = 1\n$$\nend", 3],
  ["```js\nconst a = 1;\n```\nafter code", 2],
  ["A [linked phrase](https://x.y) and ![alt](i.png) done", 5],
  ["Body text[^1]\n\n[^1]: a long footnote here", 2],
  ["{/* hidden */}<Foo bar={{a: 1}} />Shown <!-- no -->", 1],
  ["Don't stop isn't hyphen-ated \\$0.189 word", 6],
];
for (const [src, want] of cases) assert.equal(countWords(src), want, JSON.stringify(src));
console.log(`ok: ${cases.length} cases`);
