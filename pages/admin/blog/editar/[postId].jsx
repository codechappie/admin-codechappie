// import MDEditor from '@uiw/react-md-editor';
// import "@uiw/react-md-editor/dist/markdown-editor.css";
import axios from 'axios';
// import hljs from 'highlight.js';
// import 'highlight.js/styles/atom-one-dark.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dbConnect from '../../../../lib/dbConnect';
import Blog from '../../../../models/Blog';
import style from './create-blog.module.scss';

import Input from '@/components/input/Input';
import Textarea from '@/components/textarea/Textarea';
import Texteditor from '@/components/texteditor/Texteditor';

const EditPost = ({ post }) => {
    const { title: tempTitle, html_content: tempHtmlContent, description: tempDescription, tags: tempTags, published_by, published_at, image, slug: tempSlug } = post;
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [thumbnails, setThumbnails] = useState("");
    const [author, setAuthor] = useState("");
    const [authorImage, setAuthorImage] = useState("");
    const [description, setDescription] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const [date, setDate] = useState("");
    const [tags, setTags] = useState("");
    useEffect(() => {
        setTitle(tempTitle);
        setSlug(tempSlug);
        setThumbnails(image);
        setAuthor(published_by.username);
        setAuthorImage(published_by.profileImage);
        setDescription(tempDescription);
        setHtmlContent(tempHtmlContent);
        setDate(published_at);
        setTags(tempTags);
    }, [])


    // const mdParser = require('markdown-it')({
    //     highlight: function (str, lang) {
    //         if (lang && hljs.getLanguage(lang)) {
    //             try {
    //                 return '<pre class="hljs"><code>' +
    //                     hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
    //                     '</code></pre>';
    //             } catch (error) {
    //                 console.log(error)
    //             }
    //         }

    //         return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
    //     }
    // });

    const editEntry = async (e) => {
        e.preventDefault();

        try {
            axios.put(`/api/blog/${router.query.postId}`,
                {
                    title,
                    slug,
                    "image": thumbnails,
                    "published_by": {
                        "username": author,
                        "profileImage": authorImage
                    },
                    published_at: date,
                    description,
                    html_content: htmlContent,
                    tags: [
                        "PRUEBA",
                        "TEXTO",
                        "JavaScript"
                    ]
                }
            ).then(({ data }) => {
                if (data.success) {
                    // alert("Post created successfully");
                    // router.push('/blog')

                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={style.create__blog}>

            <form onSubmit={editEntry}>
                <h2>Crear una nueva entrada</h2>

                <div>
                    <Input
                        type="datetime-local"
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        }
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        label="Título"
                        placeholder="Ingresa un título..."

                    />
                </div>
                <div>
                    {/* <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        label="Título" 
                        placeholder='Ingresa un título...'
                        
                    /> */}

                    <Input leftlabel="Título"
                        placeholder='Ingresa un título...'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        }
                        value={title}
                        onchange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    {/* <input

                        onChange={(e) => setSlug(e.target.value)}
                        value={slug}
                        // labelLeft="https://codechappie.com/blog/"
                        label="Slug de la entrada"
                        placeholder="nueva-entrada"
                        
                        
                    /> */}

                    <Input leftlabel="Slug de la entrada"
                        placeholder='nueva-entrada'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                        }
                        value={slug}
                        onchange={(e) => setSlug(e.target.value)}
                    />
                    {/* <Input leftlabel="Slug de la entrada"
                        placeholder='nueva-entrada'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" width={20} viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        }
                        rightContent={"@"}
                        value={slug}
                        onchange={(e) => setSlug(e.target.value)}
                    /> */}

                </div>
                <div>
                    <Input leftlabel="Miniatura del blog"
                        placeholder='https://server.io/image.png'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" width={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        }
                        value={thumbnails}
                        onchange={(e) => setThumbnails(e.target.value)}
                    />
                </div>
                <div>
                    {/* <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} label="Autor" placeholder="Nombre de usuario"   /> */}

                    <Input leftlabel="Autor"
                        placeholder='Nombre de usuario'
                        leftContent={<svg width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        }
                        value={author}
                        onchange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    {/* <input value={authorImage} onChange={(e) => setAuthorImage(e.target.value)}
                        label="Imagen del autor" placeholder="https://server.io/image.png"   /> */}


                    <Input leftlabel="Imagen del autor"
                        placeholder='https://server.io/image.png'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        }
                        value={authorImage}
                        onchange={(e) => setAuthorImage(e.target.value)}
                    />

                </div>
                <div>
                    {/* <input value={authorImage} onChange={(e) => setAuthorImage(e.target.value)}
                        label="Tags" placeholder="tags"   /> */}

                    <Input leftlabel="Tags"
                        placeholder='tags'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                        </svg>
                        }
                        value={tags}
                        onchange={(e) => setTags(e.target.value)}
                    />

                </div>
                <div>
                    <Textarea
                        onchange={(e) => {
                            setDescription(e.target.value);
                        }}
                        value={description}
                        label="Descripción"
                        placeholder="Coloca una breve descripción..."
                    />
                </div>
                <div className={style.post__content}>
                    {/* <MDEditor height={200} preview="edit" value={htmlContent} onChange={setHtmlContent} />


                        <div className={style.markdown__content}>
                            <MDEditor.Markdown
                                source={mdParser.render(htmlContent)}
                                linkTarget="_blank"
                                className='custom-html-style'
                            />
                        </div> */}
                    {/* <Texteditor htmlContent={htmlContent} setHtmlContent={setHtmlContent} /> */}
                    <Texteditor 
                    html={htmlContent} 
                    setHtml={setHtmlContent} 
                    leftlabel="Contenido" 
                    type="both"
                    />
                </div>


                <button type='submit' >Crear entrada</button>
            </form>
        </div >
    )
}


export default EditPost

export async function getServerSideProps({ query, res }) {
    let { postId, topicId } = query;
    try {
        await dbConnect();
        let post = await Blog.findOne({
            slug: postId
        });
        post = post.toObject();
        post._id = `${post._id}`;
        return {
            props: {
                post
            },
        };
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }
}
