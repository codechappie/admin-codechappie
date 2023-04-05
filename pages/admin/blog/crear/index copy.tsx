
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import style from './create-blog.module.scss';



const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
        ssr: false,
    });
    const mdParser = require('markdown-it')({
        highlight: function (str: any, lang: any) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                        '</code></pre>';
                } catch (error) {
                    console.log(error)
                }
            }

            return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
        }
    });
    
    function handleEditorChange({ html, text }: any ,e: any) {
        console.log(html, e)
      
    }
    const renderContent = (content: any) => {
        
        // setHtmlContent(content);
        return mdParser.render(content)
    }
    const createNewEntry = (e: any) => {
        e.preventDefault();
    }
    return (
        <div className={style.create__blog}>

            <form onSubmit={createNewEntry}>
                <h2>Crear una nueva entrada</h2>


                {/* <Spacer y={2.5} />
                <Input onChange={(e: any) => setTitle(e.target.value)} value={title} bordered labelPlaceholder="Título" size="lg" />
                <Spacer y={2.5} /> */}

                <div className={style.course__content}>
                    <div className={style.course__main__content}>
                        <div className={style.markdown__content}>
                            <MdEditor style={{ height: '500px' }}
                                renderHTML={text => renderContent(text)}
                                onChange={(content, e) => handleEditorChange(content, e)} />
                        </div>
                    </div>
                </div>


                {/* <Spacer />
                <Button type='submit' size="lg">Crear entrada</Button> */}
            </form>
        </div>
    )
}

export async function getServerSideProps({ params, res }: any) {

    return {
        props: {}
    }
    // console.log("paramss: ", params.course[1])
    // let topic = null;

    // try {
    //     await dbConnect();

    //     // console.log(topic)

    //     return {
    //         props: {
    //             course,
    //             topic,
    //         }
    //     }

    // } catch (error) {
    //     return {
    //         redirect: {
    //             permanent: false,
    //             destination: "/cursos/no-encontrado"
    //         }
    //     }
    // }
}

export default CreatePost
