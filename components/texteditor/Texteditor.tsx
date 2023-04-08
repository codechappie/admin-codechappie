import dynamic from "next/dynamic";
import hljs from "highlight.js";
// import "highlight.js/styles/monokai-sublime.css";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import styles from "./Texteditor.module.scss";
interface Props {
  html: string;
  setHtml?: any;
  leftlabel?: string;
  type?: string;
}

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    [
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code",
      "code-block",
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
];

const Texteditor = ({
  html,
  setHtml,
  leftlabel,
  type = "both",
}: Props) => {
  return (
    <div className={styles.chappie__texteditor}>
      <label className={styles.leftlabel} htmlFor="">
        {type === "preview" ? "" : leftlabel}
      </label>
      <div
        className={`${styles.container} ${type !== "both" ? styles.both : ""}`}
      >
        {(type === "edit" || type === "both") && (
          <QuillNoSSRWrapper
            modules={modules}
            formats={formats}
            theme="snow"
            value={html}
            onChange={setHtml}
            className={styles.edit}
          />
        )}

        {(type === "preview" || type === "both") && (
          <QuillNoSSRWrapper
            modules={modules}
            formats={formats}
            theme="snow"
            value={html}
            className={"preview"}
            readOnly={true}
          />
        )}
      </div>
    </div>
  );
};
export default Texteditor;
