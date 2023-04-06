import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import style from "./Texteditor.module.scss";

const Texteditor = ({htmlContent, setHtmlContent}) => {
  // console.log(htmlContent, setHtmlContent)
  const mdParser = require("markdown-it")({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            "</code></pre>"
          );
        } catch (error) {
          console.log(error);
        }
      }

      return (
        '<pre class="hljs"><code>' +
        mdParser.utils.escapeHtml(str) +
        "</code></pre>"
      );
    },
  });

  return (
    <div className={style.chappie__texteditor}>
      <MDEditor
        height={200}
        preview="edit"
        value={htmlContent}
        onChange={setHtmlContent}
      />

      <div className={style.markdown__content}>
        <MDEditor.Markdown
          source={mdParser.render(htmlContent)}
          linkTarget="_blank"
          className="custom-html-style"
        />
      </div>
    </div>
  );
};

export default Texteditor;
