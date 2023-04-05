import MDEditor from '@uiw/react-md-editor';
// import "@uiw/react-md-editor/markdown-editor.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import 'react-markdown-editor-lite/lib/index.css';

import '@import "@uiw/react-md-editor/markdown-editor.css";'
import axios from 'axios';
import 'highlight.js/styles/atom-one-dark.css';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import dbConnect from '../../../../../../lib/dbConnect';
import { useForm } from '../../../../../../lib/hooks/useForm';
import { mdParser } from '../../../../../../lib/Utils';
import Course from '../../../../../../models/Course';
import style from './editar-topic.module.scss';
import Input from '@/components/input/Input'

const EditarTopicPage = ({ title: tempTitle, slug: tempSlug, video: tempVideo, markdownText: tempMarkdown }) => {
    const router = useRouter();
    const courseFormInitialState = {
        title: tempTitle,
        slug: tempSlug,
        video: tempVideo
    }
    const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
        ssr: false,
    });

    const [courseForm, handleInputChange, resetCourseForm] = useForm(courseFormInitialState);
    const {
        title,
        slug,
        video,
    } = courseForm;


    useEffect(() => {
        setMarkDownText(tempMarkdown)
    }, [])


    const [markdownText, setMarkDownText] = useState("");
    const mdParser = require('markdown-it')({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                        '</code></pre>';
                } catch (error) {
                    console.log(error)
                }
            }

            return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
        }
    });
    const updateEntry = async (e) => {
        e.preventDefault();
        let { courseId, topicId } = router.query;

        // TODO: VALIDATE INPUTS

        let tempTopicEdited = {
            title,
            slug,
            video,
            markdownText
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
                <div className={style.topic__content}>
                    <div className={style.container}>
                        <MDEditor height={200} preview='edit' value={markdownText}
                            name='description' onChange={setMarkDownText} />
                        <div className={style.markdown__content}>
                            <MDEditor.Markdown
                                source={mdParser.render(markdownText)}
                                linkTarget="_blank"
                                className='custom-html-style'
                            />
                            {/* <MdEditor
                                view={{ menu: false, md: false, html: true }}
                                renderHTML={() => mdParser.render(markdownText)} /> */}
                        </div>
                    </div>
                </div>

                <button type='submit' size="lg">Guardar cambios</button>
            </form>
        </div >
    )
}

export default EditarTopicPage

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
