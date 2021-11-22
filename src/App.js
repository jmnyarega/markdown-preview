import { marked } from "marked";
import { useState } from "react";

import "./index.css";
import "highlight.js/styles/default.css";

const initialMarkdown = `
 # Hello World!
 ## This is a beauty
 [link](https://www.google.com?q=markdown)
 \`code\`
 \`\`\`
  const x = 90;
 \`\`\`

 - one
 - two
 - three

 > quote from a smart person

 ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

 **bold text**
`;

function App() {
  const [text, setText] = useState(initialMarkdown);

  marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function (code, lang) {
      const hljs = require("highlight.js");
      const language = hljs.getLanguage(lang) ? lang : "javascript";
      return hljs.highlight(code, { language }).value;
    },
  });

  const markdown = marked.parse(text || "");

  const onChange = (e) => setText(e.target.value);
  return (
    <main className="container">
      <h3 className="title"> Markdown Previewer </h3>
      <textarea id="editor" value={text} onChange={onChange} />
      <div id="preview" dangerouslySetInnerHTML={{ __html: markdown }} />
    </main>
  );
}

export default App;
