import { Editor } from "@tinymce/tinymce-react";
import initFullProps from "./initFullProps";
import style from "./CustomEditor.module.scss";
import { useEffect, useState } from "react";
interface Props {
  html: string;
  setHtml?: any;
  leftlabel?: string;
}
const CustomEditor = ({ html, setHtml, leftlabel }: Props) => {
  const [active, setactive] = useState(false);
  let contenido: string = html || "";
  let inicioBody: number = -1;
  let finBody: number = -1;

  inicioBody = contenido.indexOf("<body>");
  finBody = contenido.indexOf("</body>");
  if (inicioBody !== -1) {
    contenido = contenido.substring(inicioBody + 6, finBody - 1);
  }

  useEffect(() => {
    setTimeout(() => {
      setactive(true);
    }, 1000);
  }, []);

  return (
    <>
      <label htmlFor="" className={style.label}>
        {leftlabel}
      </label>
      <div
        className={`${style.loader} ${style[active ? "active" : "inactive"]}`}
      >
        <svg viewBox="-25 -25 100 100" preserveAspectRatio="">
          <circle fill="#fff" stroke="none" cx="6" cy="25" r="6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 15 ; 0 -15; 0 15"
              repeatCount="indefinite"
              begin="0.1"
            />
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle fill="#fff" stroke="none" cx="30" cy="25" r="6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 10 ; 0 -10; 0 10"
              repeatCount="indefinite"
              begin="0.2"
            />
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle fill="#fff" stroke="none" cx="54" cy="25" r="6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.3"
            />
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      </div>
      <div
        className={`${style.editor__visualizer} ${
          style[active ? "active" : "inactive"]
        }`}
      >
        <Editor
          id="Editor"
          apiKey="4i60cn1d7yypl7aysrm5drvcc46jiainltvvdijgx5hgymra"
          value={contenido}
          init={initFullProps}
          onEditorChange={setHtml}
        />
      </div>
    </>
  );
};

export default CustomEditor;
