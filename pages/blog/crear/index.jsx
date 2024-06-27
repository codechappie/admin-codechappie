import CustomEditor from '@/components/customeditor/CustomEditor';
import Input from '@/components/input/Input';
import InputTag from '@/components/input-tag/InputTag';
import InputImg from '@/components/input-img/InputImg';
import Textarea from '@/components/textarea/Textarea';
import Button from '@/components/button/Button';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { generateSlug } from '@/lib/Utils';
import { useForm } from '@/lib/hooks/useForm';
import style from './create-blog.module.scss';
import { LidiaEditor } from "lidia-react-editor";

const CreatePost = () => {

    const router = useRouter();
    const [slug, setSlug] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const [thumbnailsImg, setThumbnailsImg] = useState("");
    const [authorImg, setAuthorImg] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [tags, setTags] = useState([]);

    const postFormInitialState = {
        title: '',
        author: '',
        description: '',
        date: ''
    }
    const [postForm, handleInputChange, resetPostForm] = useForm(postFormInitialState);
    const {
        title,
        author,
        description,
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
                            image: thumbnailsImg,
                            published_by: {
                                username: author,
                                profileImage: authorImg
                            },
                            published_at: date,
                            description,
                            views: 0,
                            html_content: htmlContent,
                            tags,
                            keywords,
                            public: true,
                            type: "blog"
                        }
                    ).then(({ data }) => {
                        if (data.success) {
                            alert("Post created successfully");
                        }
                        // resetPostForm();
                        // router.push('/blog')
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
                <Link href="/blog">
                    Retroceder
                </Link>
                <div className={style.first__row}>
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
                    />

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
                <Textarea
                    name='description'
                    onchange={handleInputChange}
                    value={description}
                    leftlabel="Descripción"
                    placeholder="Coloca una breve descripción..."
                />
                <div className={style.first__row}>

                    <InputImg
                        val={thumbnailsImg}
                        setter={setThumbnailsImg}
                        leftlabel="Miniatura del blog" />

                    <InputImg
                        val={authorImg}
                        setter={setAuthorImg}
                        leftlabel="Imagen del autor" />




                    <InputTag id="keywords" values={keywords} setValues={setKeywords} leftlabel="Keywords" placeholder="Curso html, aprende Java, que es TypeScript" maxLength={10} />

                    <InputTag id="tags" values={tags} setValues={setTags} leftlabel="Tags" placeholder="Etiquetas" maxLength={5} />

                </div>

                {/* <CustomEditor
                    html={htmlContent}
                    setHtml={setHtmlContent}
                    leftlabel="Contenido"
                /> */}
                <LidiaEditor
                    html={htmlContent}
                    setHtml={setHtmlContent}
                    editorStyle='dark'
                />

                <Button type='submit' className={style.button} text="Crear entrada" ></Button>
            </form>
        </div >
    )
}

export default CreatePost
CreatePost.auth = true;