import dynamic from 'next/dynamic'
import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'formats/em', 'formats/hr', 'em', 'hr'
]

export default function Home() {

  const [html, setHtml] = useState("second")


  const checkVal = () => {
    console.log("val: ", html)
  }

  return (
    <div style={{background: "white"}}>
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        defaultValue={html}
        onChange={setHtml}
      />

      <button onClick={checkVal}>Check</button>


      <div className="showHtml">
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        value={html}
        className='onlyshow'
        readOnly={true}
      />

      </div>
    </div>)
}
