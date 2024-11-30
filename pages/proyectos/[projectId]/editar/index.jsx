import CustomEditor from '@/components/customeditor/CustomEditor';
import InputImg from '@/components/input-img/InputImg';
import Input from '@/components/input/Input';
import InputTag from '@/components/input-tag/InputTag';
import Button from '@/components/button/Button';
import Textarea from '@/components/textarea/Textarea';
import dbConnect from '@/lib/dbConnect';
import { useForm } from '@/lib/hooks/useForm';
import Project from '@/models/Project';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from './create-course.module.scss';
import { LidiaEditor } from 'lidia-react-editor'


const EditCourse = ({
    _id, title: tempTitle,
    slug: tempSlug,
    description: tempDescription,
    demo: tempDemo,
    external: tempExternal,
    published_by,
    published_at,
    htmlContent: tempHtmlContent,
    preview: tempPreview,
    tags: tempTags,
    keywords: tempKeywords,
    public: tempPublic
}) => {
    const router = useRouter();
    const [isPublic, setIsPublic] = useState(tempPublic);
    const [htmlContent, setHtmlContent] = useState(tempHtmlContent);
    const [slug, setSlug] = useState(tempSlug);
    const { username, profileImage } = published_by;
    const [authorImg, setAuthorImg] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [tags, setTags] = useState([]);
    const courseFormInitialState = {
        title: tempTitle,
        author: username,
        description: tempDescription,
        demo: tempDemo,
        external: tempExternal,
        preview: tempPreview,
        date: published_at
    }

    useEffect(() => {
        setSlug(tempSlug);
        setAuthorImg(profileImage);
        setPreviewImg(tempPreview);
        setKeywords(tempKeywords);
        setTags(tempTags);
        setIsPublic(tempPublic);
    }, []);

    const [courseForm, handleInputChange, resetCourseForm] = useForm(courseFormInitialState);
    const {
        title,
        author,
        description,
        demo,
        external,
        date
    } = courseForm;

    const editEntry = async (e) => {
        e.preventDefault();
        let { projectId } = router.query;

        try {
            axios.put(`/api/project/${projectId}`,
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
                    tags,
                    keywords
                }
            ).then(({ data }) => {
                if (data.success) {
                    alert("Project updated successfully");
                } else {
                    alert(data.error)
                }
                // resetCourseForm();
                // router.push('/proyectos')
            });
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProject = async (e) => {
        e.preventDefault();
        const confirmDeleteProject = confirm("¿Deseas eliminar este proyecto?")
        if (confirmDeleteProject) {
            try {
                console.log("ID", slug)
                axios.delete(`/api/project/${slug}`).then(({ data }) => {
                    if (data.success) {
                        router.push('/proyectos')
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    const showOrHideProject = async () => {
        try {
            await axios.put(`/api/project/${slug}`,
                {
                    public: !isPublic
                }
            ).then(({ data }) => {
                if (data.success) {
                    setIsPublic(data.project.public);
                    console.log(data.project.public);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const togglePublic = () => {
        showOrHideProject()
    }

    return (
        <div className={style.create__course}>

            <div className={style.header}>
                <h2>Editar proyecto</h2>

                <div className={style.edit__buttons}>
                    <button
                        className={style.hide}
                        onClick={() => togglePublic()}
                    >
                        {isPublic ? 'Publico' : 'Oculto'}
                    </button>
                    <button
                        className={style.eliminate}
                        onClick={deleteProject}
                    >
                        Borrar
                    </button>
                </div>
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
                            onchange={handleInputChange}
                            value={title}
                            leftlabel="Título"
                            placeholder='Ingresa un título...'
                        />
                        <Input

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
                        onClick={editEntry}
                        className={`${style.button}`} text="Editar proyecto">EDITAR</button>
                </div>
            </div>
        </div >
    )
}
export default EditCourse
EditCourse.auth = true;
export async function getServerSideProps({ query, res }) {
    let { projectId } = query;
    try {
        await dbConnect();
        let project = await Project.findOne({
            slug: projectId
        });

        const projectFound = project.toObject();
        projectFound._id = `${project._id}`;

        return {
            props: {
                ...projectFound
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