import Input from '@/components/input/Input';
import CustomEditor from '@/components/customeditor/CustomEditor';
import dbConnect from '@/lib/dbConnect';
import { useForm } from '@/lib/hooks/useForm';
import InputTag from '@/components/input-tag/InputTag';
import Button from '@/components/button/Button';
import Course from '@/models/Course';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LidiaEditor } from "lidia-react-editor";
import style from './editar-topic.module.scss';

const EditarTopicPage = ({ title: tempTitle, slug: tempSlug, video: tempVideo,
    keywords: tempKeywords, htmlContent: tempHtmlContent }) => {
    const router = useRouter();
    let { courseId, topicId } = router.query;
    const [htmlContent, setHtmlContent] = useState(tempHtmlContent);
    const [keywords, setKeywords] = useState([]);
    const courseFormInitialState = {
        title: tempTitle,
        slug: tempSlug,
        video: tempVideo
    }

    const [courseForm, handleInputChange, resetCourseForm] = useForm(courseFormInitialState);
    const {
        title,
        slug,
        video,
    } = courseForm;


    useEffect(() => {
        setHtmlContent(tempHtmlContent);
        setKeywords(tempKeywords)

    }, [])


    const updateTopic = async (e) => {
        e.preventDefault();
        let tempTopicEdited = {
            title,
            slug,
            video,
            htmlContent,
            keywords
        }

        try {
            axios.put(`/api/course/${courseId}/topic/${topicId}`,
                tempTopicEdited
            ).then(({ data }) => {
                if (data.success) {
                    router.push({
                        pathname: `/cursos/${courseId}/editar/tema/${data.course.slug}`
                    })
                }
            });
        } catch (error) {
            console.log(error);
        }

    }


    const deleteTopic = async (e) => {
        e.preventDefault();

        const deleteTopic = confirm("¿Deseas elimnar el tema?");

        if (deleteTopic) {
            try {
                axios.delete(`/api/course/${courseId}/topic/${topicId}`).then(({ data }) => {
                    if (data.success) {
                        router.push('/cursos')
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className={style.create__topic}>

            <div className={style.header}>
                <h2>Editar tema</h2>
                <div className={style.edit__buttons}>
                    <button
                        className={style.eliminate}
                        type='button'
                        onClick={deleteTopic}
                    >
                        Borrar
                    </button>
                </div>
            </div>

            <form onSubmit={updateTopic}>

                <div className={style.first__col}>
                    <Input
                        name='title'
                        onchange={handleInputChange}
                        value={title}
                        leftlabel="Título"
                        placeholder='Ingresa un título...'

                    />

                    <Input
                        name='slug'
                        onchange={handleInputChange}
                        value={slug}
                        leftlabel="Slug de la entrada"
                        placeholder="nueva-entrada"
                    />
                </div>
                <Input
                    name='video'
                    onchange={handleInputChange}
                    value={video}
                    leftlabel="Enlace de video YouTube"
                    placeholder="Video del tema"
                />
                <InputTag id="keywords" values={keywords} setValues={setKeywords} leftlabel="Keywords" placeholder="Curso html, aprende Java, que es TypeScript" maxLength={10} />

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

                <Button type='submit' className={`${style.button}`} text="Guardar cambios"></Button>
            </form>
        </div >
    )
}

export default EditarTopicPage
EditarTopicPage.auth = true;

export async function getServerSideProps({ query, res }) {
    let { courseId, topicId } = query;
    try {
        await dbConnect();
        let courses = await Course.findOne({
            slug: courseId
        });

        let foundTopic = courses.topics.filter(el => el.slug == topicId)[0];

        console.log("F", foundTopic)
        if (!foundTopic) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/cursos",
                }
            }
        }
        return {
            props: {
                // topic: JSON.parse(JSON.stringify()),
                ...foundTopic
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
