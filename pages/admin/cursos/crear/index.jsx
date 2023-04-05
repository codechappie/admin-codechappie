import Input from '@components/input/Input';
import Textarea from '@components/textarea/Textarea';
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import axios from 'axios';
import 'highlight.js/styles/atom-one-dark.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from '../../../../lib/hooks/useForm';
import { mdParser } from '../../../../lib/Utils';
import style from './create-blog.module.scss';

const CreateCourse = () => {
    const router = useRouter();
    const courseFormInitialState = {
        title: '',
        slug: '',
        shortDescription: '',
        preview: '',
        tags: '',
    }
    const [courseForm, handleInputChange, resetCourseForm] = useForm(courseFormInitialState);
    const {
        title,
        slug,
        shortDescription,
        preview,
        tags,
    } = courseForm;

    const [description, setDescription] = useState("");
    const createNewEntry = async (e) => {
        e.preventDefault();

        try {
            axios.post('/api/course/create',
                {
                    title,
                    slug,
                    shortDescription,
                    description,
                    topics: [],
                    preview,
                    tags: tags.split(','),
                }
            ).then(({ data }) => {
                if (data.success) {
                    alert("Post created successfully");
                }
                resetCourseForm();
                router.push('/cursos')
            });
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
                        name='title'
                        onChange={handleInputChange}
                        value={title} bordered
                        label="Título"
                        placeholder='Ingresa un título...'
                    />

                </div>
                <div>
                    <Input
                        bordered
                        name='slug'
                        onChange={handleInputChange}
                        value={slug}
                        // labelLeft="https://codechappie.com/blog/"
                        label="Slug de la entrada"
                        placeholder="nueva-entrada"

                    />

                </div>
                <div>
                    <Input
                        bordered
                        name='preview'
                        onChange={handleInputChange}
                        value={preview}
                        label="Vista previa del curso"
                        placeholder="Vista previa del curso"

                    />

                </div>
                <div>
                    <Input
                        bordered
                        name='tags'
                        onChange={handleInputChange}
                        value={tags}
                        label="Etiquetas"
                        placeholder="Python, Java, TypeScript"

                    />

                </div>
                <div>
                    <Textarea
                        name='shortDescription'
                        onChange={handleInputChange}
                        value={shortDescription}
                        bordered
                        label="Descripción corta"
                        placeholder="Coloca una breve descripción..."
                    />

                </div>
                <div className={style.course__content}>
                    <div className="container">
                        <MDEditor height={200} value={description}
                            name='description' onChange={setDescription} />
                        <div style={{ padding: "50px 0 0 0" }} />
                        <MDEditor.Markdown
                            source={mdParser.render(description)}
                            linkTarget="_blank"
                        />
                    </div>
                </div>

                <button type='submit'>Crear entrada</button>
            </form>
        </div >
    )
}

export default CreateCourse
