const initFullProps = {
  menubar: false,
  formats: {
    tindent_format: { selector: "p", styles: { "text-indent": "40mm" } },
  },
  toolbar:
    "undo redo | preview fullscreen | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography codesample code | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  plugins: [
    "fullscreen",
    "preview",
    "anchor",
    "autolink",
    "charmap",
    "codesample",
    "code",
    "emoticons",
    "image",
    "link",
    "lists",
    "media",
    "searchreplace",
    "table",
    "visualblocks",
    "wordcount",
    "checklist",
    "mediaembed",
    "casechange",
    "export",
    "formatpainter",
    "pageembed",
    "linkchecker",
    "a11ychecker",
    "tinymcespellchecker",
    "permanentpen",
    "powerpaste",
    "advtable",
    "advcode",
    "editimage",
    "tableofcontents",
    "footnotes",
    "mergetags",
    // "autocorrect",
    "typography",
    "inlinecss",
  ],
  // external_plugins: {
  //   pluginId: "https://prismjs.com/plugins/copy-to-clipboard/",
  // },
  mobile: {
    theme: "mobile",
    toolbar: ["undo", "bold", "italic", "styleselect, restoredraft"],
  },
  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt",
  contextmenu: " copy  wordcount",
  browser_spellcheck: true,
  language: "en",
  language_url: "/tinymce/langs/es.js",
  paste_data_images: true,
  branding: false,
  setup: (editor: any) => {
    editor.ui.registry.addIcon(
      "calendar",
      '<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="21px" height="21px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><rect x="23.333" y="50" width="12" height="8" style="stroke:#ff0000;stroke-width:2;fill:#ffffff"/><rect x="43.333" y="50" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="63.333" y="50" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="23.333" y="66.666" 0width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="43.333" y="66.666" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="63.333" y="66.666" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><path d="M83.333,16.666h-10V10h-6.666v6.667H33.333V10h-6.666v6.667h-10c-3.666,0-6.667,3.001-6.667,6.667v66.666h80V23.333 C90,19.667,86.999,16.666,83.333,16.666z M83.333,83.333H16.667v-40h66.666V83.333z M16.667,36.666V23.333h10V30h6.666v-6.667 h33.334V30h6.666v-6.667h10v13.333H16.667z"/></svg>'
    );
    editor.ui.registry.addButton("tfecha_bttn", {
      text: "",
      icon: "calendar",
      tooltip: "Inserta la fecha del día",
      onAction: function () {
        var d = new Date();
        var n = d.getDay();
        var fecha: string = d.toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        editor.execCommand("mceInsertContent", false, fecha);
      },
    });
  },
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "XML", value: "xml" },
    { text: "HTML", value: "html" },
    { text: "mathml", value: "mathml" },
    { text: "SVG", value: "svg" },
    { text: "CSS", value: "css" },
    { text: "Clike", value: "clike" },
    { text: "Javascript", value: "javascript" },
    { text: "ActionScript", value: "actionscript" },
    { text: "apacheconf", value: "apacheconf" },
    { text: "apl", value: "apl" },
    { text: "applescript", value: "applescript" },
    { text: "asciidoc", value: "asciidoc" },
    { text: "aspnet", value: "aspnet" },
    { text: "autoit", value: "autoit" },
    { text: "autohotkey", value: "autohotkey" },
    { text: "bash", value: "bash" },
    { text: "basic", value: "basic" },
    { text: "batch", value: "batch" },
    { text: "c", value: "c" },
    { text: "brainfuck", value: "brainfuck" },
    { text: "bro", value: "bro" },
    { text: "bison", value: "bison" },
    { text: "C#", value: "csharp" },
    { text: "C++", value: "cpp" },
    { text: "CoffeeScript", value: "coffeescript" },
    { text: "ruby", value: "ruby" },
    { text: "d", value: "d" },
    { text: "dart", value: "dart" },
    { text: "diff", value: "diff" },
    { text: "docker", value: "docker" },
    { text: "eiffel", value: "eiffel" },
    { text: "elixir", value: "elixir" },
    { text: "erlang", value: "erlang" },
    { text: "fsharp", value: "fsharp" },
    { text: "fortran", value: "fortran" },
    { text: "git", value: "git" },
    { text: "glsl", value: "glsl" },
    { text: "go", value: "go" },
    { text: "groovy", value: "groovy" },
    { text: "haml", value: "haml" },
    { text: "handlebars", value: "handlebars" },
    { text: "haskell", value: "haskell" },
    { text: "haxe", value: "haxe" },
    { text: "http", value: "http" },
    { text: "icon", value: "icon" },
    { text: "inform7", value: "inform7" },
    { text: "ini", value: "ini" },
    { text: "j", value: "j" },
    { text: "jade", value: "jade" },
    { text: "java", value: "java" },
    { text: "JSON", value: "json" },
    { text: "jsonp", value: "jsonp" },
    { text: "julia", value: "julia" },
    { text: "keyman", value: "keyman" },
    { text: "kotlin", value: "kotlin" },
    { text: "latex", value: "latex" },
    { text: "less", value: "less" },
    { text: "lolcode", value: "lolcode" },
    { text: "lua", value: "lua" },
    { text: "makefile", value: "makefile" },
    { text: "markdown", value: "markdown" },
    { text: "matlab", value: "matlab" },
    { text: "mel", value: "mel" },
    { text: "mizar", value: "mizar" },
    { text: "monkey", value: "monkey" },
    { text: "nasm", value: "nasm" },
    { text: "nginx", value: "nginx" },
    { text: "nim", value: "nim" },
    { text: "nix", value: "nix" },
    { text: "nsis", value: "nsis" },
    { text: "objectivec", value: "objectivec" },
    { text: "ocaml", value: "ocaml" },
    { text: "oz", value: "oz" },
    { text: "parigp", value: "parigp" },
    { text: "parser", value: "parser" },
    { text: "pascal", value: "pascal" },
    { text: "perl", value: "perl" },
    { text: "PHP", value: "php" },
    { text: "processing", value: "processing" },
    { text: "prolog", value: "prolog" },
    { text: "protobuf", value: "protobuf" },
    { text: "puppet", value: "puppet" },
    { text: "pure", value: "pure" },
    { text: "python", value: "python" },
    { text: "q", value: "q" },
    { text: "qore", value: "qore" },
    { text: "r", value: "r" },
    { text: "jsx", value: "jsx" },
    { text: "rest", value: "rest" },
    { text: "rip", value: "rip" },
    { text: "roboconf", value: "roboconf" },
    { text: "crystal", value: "crystal" },
    { text: "rust", value: "rust" },
    { text: "sas", value: "sas" },
    { text: "sass", value: "sass" },
    { text: "scss", value: "scss" },
    { text: "scala", value: "scala" },
    { text: "scheme", value: "scheme" },
    { text: "smalltalk", value: "smalltalk" },
    { text: "smarty", value: "smarty" },
    { text: "SQL", value: "sql" },
    { text: "stylus", value: "stylus" },
    { text: "swift", value: "swift" },
    { text: "tcl", value: "tcl" },
    { text: "textile", value: "textile" },
    { text: "twig", value: "twig" },
    { text: "TypeScript", value: "typescript" },
    { text: "verilog", value: "verilog" },
    { text: "vhdl", value: "vhdl" },
    { text: "wiki", value: "wiki" },
    { text: "YAML", value: "yaml" },
  ],
  height: "800px",
  content_style: "",
  content_css: [
    "dark",
    "https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-okaidia.min.css",
    
  ]
  // content_style: ``
  // content_style: `
  //   html{
  //     display: flex;
  //     flex-flow: row nowrap;
  //     justify-content: center;
  //     margin: 0;
  //     padding: 0;
  //     background: rgb(248 249 250);
  //   }

  //   body {
  //     zoom: 1.5;
  //     width:150mm;
  //     padding-left:20mm;
  //     padding-right:20mm;
  //     padding-top:15mm;
  //     text-align: justify;
  //     line-height: 1.5;
  //     font-family: Arial;
  //     font-size: 12pt;
  //     background: rgb(248 249 250);
  //     overflow-x: auto;
  //     cursor: auto;
  //     color: black;
  //   }

  //   .mce-content-body p {
  //     margin: 0
  //   }

  //   figure {
  //     outline: 3px solid #dedede;
  //     position: relative;
  //     display: inline-block
  //   }
  //   figure:hover {
  //     outline-color: #ffc83d
  //   }
  //   figure > figcaption {
  //     color: #333;
  //     background-color: #f7f7f7;
  //     text-align: center
  //   }
  //   `,
};

export default initFullProps;
