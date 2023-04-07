import dynamic from "next/dynamic";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
// import { Dispatch, SetStateAction, useState } from 'react'
import "react-quill/dist/quill.snow.css";

interface Props {
  html: string;
  setHtml: any;
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
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
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

const Texteditor = ({ html, setHtml }: Props) => {
  // const [html, setHtml] = useState("second")

  const checkVal = () => {
    console.log("val: ", html);
  };

  return (
    <div>
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        defaultValue={html}
        onChange={setHtml}
      />

      <div className="showHtml">
        <QuillNoSSRWrapper
          modules={modules}
          formats={formats}
          theme="snow"
          value={html}
          className="onlyshow"
          readOnly={true}
        />
      </div>
    </div>
  );
};
export default Texteditor;
