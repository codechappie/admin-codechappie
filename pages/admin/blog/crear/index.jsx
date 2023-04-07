import { useState } from 'react';
import style from './create-blog.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from '../../../../lib/hooks/useForm'
import { generateSlug } from '../../../../lib/Utils';
import Input from '@/components/input/Input';
import Textarea from '@/components/textarea/Textarea';
import Texteditor from '@/components/texteditor/Texteditor'

const CreatePost = () => {
    const router = useRouter();
    const [slug, setSlug] = useState("");
    const [htmlContent, setHtmlContent] = useState("");

    const postFormInitialState = {
        title: '',
        thumbnails: '',
        author: '',
        authorImage: '',
        description: '',
        tags: '',
        date: ''
    }
    const [postForm, handleInputChange, resetPostForm] = useForm(postFormInitialState);
    const {
        title,
        thumbnails,
        author,
        authorImage,
        description,
        tags,
        date
    } = postForm;


    const createNewEntry = async (e) => {
        e.preventDefault();

        try {
            await axios.get("/api/blog", {
                params: {
                    postId: slug
                }
            }).then(({ data }) => {
                if (!data.postExists) {
                    axios.post('/api/blog',
                        {
                            title,
                            slug,
                            image: thumbnails,
                            published_by: {
                                username: author,
                                profileImage: authorImage
                            },
                            published_at: date,
                            description,
                            html_content: htmlContent,
                            tags: tags.split(",")
                        }
                    ).then(({ data }) => {
                        if (data.success) {
                            alert("Post created successfully");
                        }
                        resetPostForm();
                        router.push('/blog')
                    });
                } else {
                    console.log("slug ya existe!!")
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={style.create__blog}>

            <form onSubmit={createNewEntry}>
                <h2>Crear una nueva entrada</h2>

                <div>
                    <Input
                        id="datetime"
                        type="datetime-local"
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        }
                        onchange={handleInputChange}
                        leftlabel='Fecha de publicación'
                        value={date}
                        name='date'
                        placeholder='Ingresa un título...'

                    />
                </div>
                <div>
                    <Input
                        id='title'
                        leftlabel="Título"
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        }
                        name='title'
                        onchange={(e) => {
                            handleInputChange(e);
                            setSlug(generateSlug(e.target.value))
                        }}
                        value={title}
                        placeholder='Ingresa un título...'

                    />
                </div>
                <div>
                    <Input
                        id='slug'
                        name='slug'
                        onchange={(e) => setSlug(e.target.value)}
                        value={slug}
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                        }
                        leftlabel="Slug de la entrada"
                        placeholder="nueva-entrada"


                    />
                </div>
                <div>
                    <Input
                        name='thumbnails'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        }
                        onchange={handleInputChange}
                        value={thumbnails}
                        leftlabel="Miniatura del blog"
                        placeholder='https://server.io/image.png'

                    />
                </div>
                <div>
                    <Input
                        value={author}
                        name='author'
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        }
                        onchange={handleInputChange}
                        leftlabel="Autor"
                        placeholder="Nombre de usuario" />
                </div>
                <div>
                    <Input
                        value={authorImage}
                        name='authorImage'
                        onchange={handleInputChange}
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        }
                        leftlabel="Imagen del autor"
                        placeholder="https://server.io/image.png" />
                </div>
                <div>
                    <Input value={tags}
                        name='tags' onchange={handleInputChange}
                        leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                        </svg>
                        }
                        leftlabel="tags" placeholder="tags" />
                </div>
                <div>
                    <Textarea
                        name='description'
                        onchange={handleInputChange}
                        value={description}
                        leftlabel="Descripción"
                        placeholder="Coloca una breve descripción..."
                    />
                </div>
                {/* <div className={style.blog__content}> */}
                    <Texteditor 
                    html={htmlContent} 
                    setHtml={setHtmlContent} 
                    leftlabel="Contenido" 
                    type="both"
                    />
                {/* </div> */}
                <button type='submit' >Crear entrada</button>
            </form>
        </div >
    )
}

export default CreatePost
