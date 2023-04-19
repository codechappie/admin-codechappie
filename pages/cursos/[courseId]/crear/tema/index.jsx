

import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from '@/lib/hooks/useForm';
import style from './create-topic.module.scss';
import Input from '@/components/input/Input'
import { generateSlug } from '@/lib/Utils';
import CustomEditor from '@/components/customeditor/CustomEditor';

const TopicPage = () => {
    const router = useRouter();
    const [slug, setSlug] = useState("");
    const courseFormInitialState = {
        title: '',
        video: '',
        keywords: ''
    }

    const [courseForm, handleInputChange, resetCourseForm] = useForm(courseFormInitialState);
    const {
        title,
        video,
        keywords,
    } = courseForm;



    const [htmlContent, setHtmlContent] = useState(""); const createNewEntry = async (e) => {
        e.preventDefault();
        let courseId = router.query.courseId;

        // TODO: VALIDATE INPUTS

        let newTopic = {
            title,
            slug,
            video,
            htmlContent,
            keywords: keywords.split(",")
        }


        // TODO: MAKE THIS PROCCESS IN BACKEND
        let { data: { courses } } = await axios.get('/api/course/' + courseId);
        let tempCourse = courses[0];

        let newCourse = {
            topics: [
                ...tempCourse.topics,
                newTopic
            ]
        }

        try {
            axios.put('/api/course/' + courseId,
                newCourse
            ).then(({ data }) => {
                if (data.success) {
                    alert("Topic created successfully");
                }

                resetCourseForm();
               
                router.push(`${window.location.origin}/cursos/${courseId}/${data.topic.topics.at(-1).slug}`)
            });
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className={style.create__topic}>

            <form onSubmit={createNewEntry}>
                <h2>Crear una nueva tema</h2>


                <div>
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

                </div>
                <div>
                    <Input

                        required
                        name='slug'
                        onchange={() => setSlug(e.target.value)}
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
                        leftlabel="Enlace de video YouTube"
                        placeholder="Video del tema"


                    />

                </div>

                <div>
                    <Input

                        name='keywords'
                        onchange={handleInputChange}
                        value={keywords}
                        leftlabel="Keywords"
                        placeholder="Palabras clave"

                    />

                </div>

                <CustomEditor
                    html={htmlContent}
                    setHtml={setHtmlContent}
                    leftlabel="Contenido"
                />

                <button type='submit' >Crear tema</button>
            </form>
        </div >
    )
}

export default TopicPage