import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'
import Select from '@/components/select'

const Texteditor = () => {
  // const [selected, setSelected] = useState(headings[0].text);
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Blockquote,
      Heading.configure({
        levels: [1, 2],
      })

    ],
    content: `
    <h1>This is a 1st level heading</h1>
    <h2>This is a 2nd level heading</h2>
    <h3>This is a 3rd level heading</h3>
    <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>
    `,
  })

  if (!editor) {
    return null
  }

  const headings = [{
    text: "h1",
    onclick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    text: "h2",
    onclick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  }];
  return (
    <>
      <Select values={headings} editor={editor} />
      {/* <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        H3
      </button> */}

      <EditorContent editor={editor} />
    </>
  )
}

export default Texteditor