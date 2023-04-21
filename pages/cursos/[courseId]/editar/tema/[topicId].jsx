import Input from '@/components/input/Input';
import CustomEditor from '@/components/customeditor/CustomEditor';
import dbConnect from '@/lib/dbConnect';
import { useForm } from '@/lib/hooks/useForm';
import Course from '@/models/Course';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import style from './editar-topic.module.scss';

const EditarTopicPage = ({ title: tempTitle, slug: tempSlug, video: tempVideo, htmlContent: tempHtmlContent }) => {
    const router = useRouter();
    const [htmlContent, setHtmlContent] = useState("");
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
        setHtmlContent(tempHtmlContent)
    }, [])

   
    const updateEntry = async (e) => {
        e.preventDefault();
        let { courseId, topicId } = router.query;

        // TODO: VALIDATE INPUTS

        let tempTopicEdited = {
            title,
            slug,
            video,
            htmlContent
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

                <div>
                    <Input
                        name='title'

                        onchange={handleInputChange}
                        value={title}
                        leftlabel="Título"
                        placeholder='Ingresa un título...'

                    />

                </div>
                <div>
                    <Input


                        name='slug'
                        onchange={handleInputChange}
                        value={slug}
                        leftlabel="Slug de la entrada"
                        placeholder="nueva-entrada"


                    />

                </div>
                <div>
                    <Input

                        name='video'
                        onchange={handleInputChange}
                        value={video}
                        label="Enlace de video YouTube"
                        placeholder="Video del tema"


                    />

                </div>
                <CustomEditor
                    html={htmlContent}
                    setHtml={setHtmlContent}
                    leftlabel="Contenido"
                />


                <button type='submit' >Guardar cambios</button>
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
