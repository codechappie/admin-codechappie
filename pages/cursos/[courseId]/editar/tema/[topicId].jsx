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
import style from './editar-topic.module.scss';

const EditarTopicPage = ({ title: tempTitle, slug: tempSlug, video: tempVideo, keywords: tempKeywords, htmlContent: tempHtmlContent }) => {
    const router = useRouter();
    const [htmlContent, setHtmlContent] = useState("");
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


    const updateEntry = async (e) => {
        e.preventDefault();
        let { courseId, topicId } = router.query;

        // TODO: VALIDATE INPUTS

        let tempTopicEdited = {
            title,
            slug,
            video,
            htmlContent,
            keywords
        }

        // TODO: MAKE THIS PROCCESS IN BACKEND
        let { data: { courses } } = await axios.get('/api/course/' + courseId);
        let tempCourse = courses[0];

        let topicsEdited = tempCourse.topics.map(elem => {
            if (elem.slug === topicId) {
                return tempTopicEdited;
            } else return elem
        });

        let courseEdited = {
            ...tempCourse,
            topics: topicsEdited
        }

        try {
            axios.put('/api/course/' + courseId,
                courseEdited
            ).then(({ data }) => {
                if (data.success) {
                    alert("Topic updated successfully");
                }

                router.push(`${window.location.origin}/cursos/${courseId}/${slug}`)
            });
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className={style.create__topic}>
            <form onSubmit={updateEntry}>
                <h2>Editar una nueva tema</h2>

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

                <CustomEditor
                    html={htmlContent}
                    setHtml={setHtmlContent}
                    leftlabel="Contenido"
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

        let foundTopic = courses.topics.filter(el => el.slug == topicId)[0]
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
