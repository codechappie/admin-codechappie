
import Input from '@/components/input/Input';
import InputImg from '@/components/input-img/InputImg';
import InputTag from '@/components/input-tag/InputTag';
import Button from '@/components/button/Button';
import Textarea from '@/components/textarea/Textarea';
import { generateSlug } from '@/lib/Utils';
import { useForm } from '@/lib/hooks/useForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import style from './create-course.module.scss';
import { LidiaEditor } from "lidia-react-editor";

const CreateProject = () => {
    const router = useRouter();
    const [htmlContent, setHtmlContent] = useState("");
    const [slug, setSlug] = useState("");
    const [authorImg, setAuthorImg] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [tags, setTags] = useState([]);

    const projectFormInitialState = {
        title: '',
        author: '',
        description: '',
        demo: '',
        external: '',
        date: ''
    }
    const [projectForm, handleInputChange, resetProjectForm] = useForm(projectFormInitialState);
    const {
        title,
        author,
        description,
        demo,
        external,
        date,
    } = projectForm;

    const createNewProject = async (e) => {
        e.preventDefault();

        try {

            axios.post('/api/project',
                {
                    title,
                    slug,
                    description,
                    demo,
                    external,
                    published_at: date,
                    published_by: {
                        username: author,
                        profileImage: authorImg,
                    },
                    htmlContent,
                    preview: previewImg,
                    views: 0,
                    tags,
                    keywords,
                    public: true,
                    type: "proyecto",
                }
            ).then(({ data }) => {
                if (data.success) {
                    // resetProjectForm();
                    router.push('/proyectos')
                } else {
                    if (data.error === "PROJECT_ALREADY_EXISTS") {
                        alert("SLUG DEL PROYECTO EN USO");
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={style.create__course}>

            <div className={style.header}>
                <h2>Nuevo proyecto</h2>
            </div>
            <div className={style.container}>
                <div>

                    <div className={style.three__cols}>
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
                            name='title'
                            onchange={(e) => {
                                handleInputChange(e);
                                setSlug(generateSlug(e.target.value));
                            }}
                            value={title}
                            leftlabel="Título"
                            placeholder='Ingresa un título...'
                        />
                        <Input
                            required
                            name='slug'
                            onchange={(e) => setSlug(e.target.value)}
                            value={slug}
                            leftlabel="Slug de proyecto"
                            placeholder="nuevo-proyecto"

                        />
                    </div>

                    <div className={style.one__cols}>
                        <Textarea
                            name='description'
                            onchange={handleInputChange}
                            value={description}

                            leftlabel="Descripción"
                            placeholder="Coloca descripción..."
                        />
                    </div>
                    <div className={style.two__cols}>
                        <Input
                            value={demo}
                            name='demo'
                            onchange={handleInputChange}
                            leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            }
                            leftlabel="URL Demo"
                            placeholder="https://example.com/aW2fsWf1" />

                        <Input
                            value={external}
                            name='external'
                            onchange={handleInputChange}
                            leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            }
                            leftlabel="URL External"
                            placeholder="https://example.com/fsWf134" />

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
                    <div className={style.three__cols}>
                        <InputImg
                            val={authorImg}
                            setter={setAuthorImg}
                            leftlabel="Imagen del autor" />

                        <InputImg
                            setter={setPreviewImg}
                            val={previewImg}
                            leftlabel="Miniatura"

                        />
                    </div>

                    <div className={style.two__cols}>
                        <InputTag id="keywords" values={keywords} setValues={setKeywords} leftlabel="Keywords" placeholder="Curso html, aprende Java, que es TypeScript" maxLength={10} />

                        <InputTag id="tags" values={tags} setValues={setTags} leftlabel="Tags" placeholder="Etiquetas" maxLength={5} />

                    </div>

                    <LidiaEditor
                        html={htmlContent}
                        setHtml={setHtmlContent}
                        editorStyle='dark'
                    />

                    <button
                        onClick={createNewProject}
                        className={`${style.button}`} text="Nuevo proyecto">Nuevo proyecto</button>
                </div>
            </div>
        </div >
    )
}

export default CreateProject

CreateProject.auth = true;