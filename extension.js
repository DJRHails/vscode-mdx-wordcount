const vscode = require("vscode");
const { countWords } = require("./count");

const EXTENSIONS = /\.(?:mdx|md)$/i;
const WORDS_PER_MINUTE = 250;

function activate(context) {
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  context.subscriptions.push(item);

  const refresh = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !EXTENSIONS.test(editor.document.fileName)) {
      item.hide();
      return;
    }
    const total = countWords(editor.document.getText());
    const selected = editor.selections
      .filter((s) => !s.isEmpty)
      .reduce((sum, s) => sum + countWords(editor.document.getText(s)), 0);
    const fmt = (n) => n.toLocaleString("en-GB");
    item.text = selected ? `${fmt(selected)} / ${fmt(total)} words` : `${fmt(total)} words`;
    item.tooltip = `Prose words, excluding frontmatter, imports, JSX, code and maths. ~${Math.max(
      1,
      Math.ceil(total / WORDS_PER_MINUTE),
    )} min read at ${WORDS_PER_MINUTE} wpm`;
    item.show();
  };

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(refresh),
    vscode.window.onDidChangeTextEditorSelection(refresh),
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document === vscode.window.activeTextEditor?.document) refresh();
    }),
  );
  refresh();
}

module.exports = { activate, deactivate() {} };
