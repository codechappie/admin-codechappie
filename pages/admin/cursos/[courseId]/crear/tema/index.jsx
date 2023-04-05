import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/dist/markdown-editor.css";
import axios from 'axios';
import 'highlight.js/styles/atom-one-dark.css';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useForm } from '../../../../../../lib/hooks/useForm';
import { mdParser } from '../../../../../../lib/Utils';
import style from './create-topic.module.scss';
import Input from '@/components/input/Input'

const TopicPage = () => {
    const router = useRouter();
    const courseFormInitialState = {
        title: '',
        slug: '',
        video: ''
    }

    const [courseForm, handleInputChange, resetCourseForm] = useForm(courseFormInitialState);
    const {
        title,
        slug,
        video,
    } = courseForm;


    const [markdownText, setMarkDownText] = useState("");
    const createNewEntry = async (e) => {
        e.preventDefault();
        let courseId = router.query.courseId;

        // TODO: VALIDATE INPUTS

        let newTopic = {
            title,
            slug,
            video,
            markdownText
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

                // resetCourseForm();
                router.push(`${window.location.origin}/cursos/${courseId}/${data.topics.at(-1).slug}`)
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
                        required
                        onChange={handleInputChange}
                        value={title} bordered
                        label="Título" size="lg"
                        placeholder='Ingresa un título...'
                        color="primary"
                    />

                </div>
                <div>
                    <Input
                        bordered
                        required
                        name='slug'
                        onChange={handleInputChange}
                        value={slug}
                        label="Slug de la entrada"
                        placeholder="nueva-entrada"
                        size="lg"
                        color="primary"
                    />

                </div>
                <div>
                    <Input
                        bordered
                        name='video'
                        onChange={handleInputChange}
                        value={video}
                        label="Enlace de video YouTube"
                        placeholder="Video del tema"
                        size="lg"
                        color="primary"
                    />

                </div>
                <div className={style.course__content}>
                    <div className="container">
                        <MDEditor height={200} value={markdownText}
                            name='description' onChange={setMarkDownText} />

                        <MDEditor.Markdown
                            source={mdParser.render(markdownText)}
                            linkTarget="_blank"
                        />
                    </div>
                </div>

                <button type='submit' size="lg">Crear tema</button>
            </form>
        </div >
    )
}

export default TopicPage