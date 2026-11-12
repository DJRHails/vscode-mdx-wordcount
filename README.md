# MDX Word Count

VS Code status-bar word count for `.mdx`/`.md` prose. Ignores frontmatter, imports/exports, JSX tags, comments, code, maths and footnotes. Shows `selected / total words` when text is selected; hover for reading time at 250 wpm.

Install from the Marketplace: `code --install-extension DJRHails.mdx-wordcount`. For local development, `ln -sfn "$PWD" ~/.vscode/extensions/DJRHails.mdx-wordcount`, then **Developer: Reload Window**.

Test: `node test.mjs`

Releases are continuous: a push to `main` with a new `version` in `package.json` publishes it to the Marketplace and as a GitHub release (`.github/workflows/release.yml`).
