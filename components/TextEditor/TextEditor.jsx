/* Imports */
import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import Prism from "prismjs";
// import * as prettier from "prettier/standalone"
// import parserBabel from "prettier/plugins/babel";
// import * as prettierPluginEstree from "prettier/plugins/estree";


import dynamic from 'next/dynamic';
/* Using dynamic import of Jodit component as it can't render in server side*/
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

/*functions*/
const TextEditor = ({ text, setText }) => {
  const editor = useRef(null); //declared a null value 

  // useLayoutEffect(() => {

  //   setText(text)
  // }, [text]);
  /* The most important point*/
  // const config = useMemo( //  Using of useMemo while make custom configuration is strictly recomended 
  //   () => ({              //  if you don't use it the editor will lose focus every time when you make any change to the editor, even an addition of one character
  //     /* Custom image uploader button configuretion to accept image and convert it to base64 format */
  //     readonly: false,
  //     uploader: {
  //       insertImageAsBase64URI: true,
  //       imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'] // this line is not much important , use if you only strictly want to allow some specific image format
  //     },
  //     showXPathInStatusbar: false,
  //     showCharsCounter: false,
  //     showWordsCounter: false,
  //     toolbarAdaptive: false

  //   }),
  //   []
  // );
  const config = useMemo(
    () => ({
      buttons: ["pasteCode", "bold", "italic", "underline", "strikethrough", "|", "ul", "ol", "|", "center", "left", "right", "justify", "|", "link", "image"],
      uploader: { insertImageAsBase64URI: true },
      removeButtons: [],
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,

      theme: "default",
      // height: 500,
      enableDragAndDropFileToEditor: true,
      experimentalDecorators: true,
      readonly: false,
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'] // this line is not much important , use if you only strictly want to allow some specific image format
      },
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: true,
      toolbar: true,
      readonly: false,
      autofocus: true,
      tabIndex: 1,

      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      defaultActionOnPaste: 'insert_as_html',

      beautyHTML: true,
      toolbarButtonSize: "large",
      disablePlugins: [],

      buttons: [
        'bold',
        'strikethrough',
        'underline',
        'italic', '|',
        'ul',
        'ol', '|',
        'outdent', 'indent', '|',
        'font',
        'fontsize',
        'brush',
        'paragraph', '|',
        'image',
        'video',
        'table',
        'link', '|',
        'align', 'undo', 'redo', '|',
        'hr',
        'eraser',
        'copyformat', '|',
        'symbol',
        'fullsize',
        'print',
        "pasteCode"
      ],

      buttons: ['source', 'fullsize', '|', 'bold', 'strikethrough',
        {
          iconURL: '',
          tooltip: 'Insert My Name',
          exec: function (editor) {
            // editor.selection.insertHTML("Hi this is Guy");
            // editor.prompt('Enter your name', 'Prompt Dialog', name => {
            //   console.log(name)
            //   const nom = name;
            //   editor.alert(`NOombre: ${nom}`);

            //   const code = `var data = 1;`;

            //   const html = `
            //   <pre class="pre-code">
            //   <code>
            //   ${Prism.highlight(name, Prism.languages.javascript, 'javascript')}
            //   </code>
            //   </pre>
            //   `;


            //   editor.selection.insertHTML(html);


            // });

            const dialog = editor.dlg();
            dialog.setHeader('The header!');
            dialog.setContent(`
            <label for="story">Selecciona un lenguaje:</label>
            <select id="language">
              <option value="javascript" selected>JavaScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>

<textarea id="story" name="story" rows="5" cols="33"></textarea>
<button id="addcode">AGREGAR CODIGO</button>
            `);

            dialog.open();


            const btn = document.querySelector("#addcode");
            const select = document.querySelector("#language");
            btn.addEventListener("click", async () => {
              const textCode = document.querySelector("#story").value;

              console.log("CF", select.value, textCode);

              // const codeFormated = await prettier.format(textCode, { 
              //   parser: "babel", 
              //   plugins: [parserBabel, prettierPluginEstree] });

              const codeToFormat = Prism.highlight(textCode,
                Prism.languages[select.value], select
              );

              const html = `
                <div class="pre-code">
                  <pre class="language-${select.value}">
                  ${codeToFormat}
                  </pre>
                </div>`;

              editor.selection.insertHTML(html);
            })
          }
        }],

    }),
    []
  );

  return <JoditEditor
    ref={editor}            //This is important
    value={text}         //This is important
    config={config}         //Only use when you declare some custom configs
    onChange={newContent => {
      setText(newContent)
    }} //handle the changes
  />;
}

export default TextEditor;