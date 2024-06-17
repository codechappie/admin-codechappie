import CustomEditor from '@/components/customeditor/CustomEditor';
import InputImg from '@/components/input-img/InputImg';
import Input from '@/components/input/Input';
import InputTag from '@/components/input-tag/InputTag';
import Button from '@/components/button/Button';
import Textarea from '@/components/textarea/Textarea';
import dbConnect from '@/lib/dbConnect';
import { useForm } from '@/lib/hooks/useForm';
import Course from '@/models/Course';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from './create-course.module.scss';
import { LidiaEditor } from 'lidia-react-editor'


const EditCourse = ({
    _id, title: temptitle, slug: tempSlug, badge: tempBadge,
    published_by, published_at, youtubeEmbedURL: tempURL, shortDescription: description,
    preview: tempPreview, keywords: tempKeywords, tags: tempTags, htmlContent: tempHtmlContent }) => {
    const router = useRouter();
    const [htmlContent, setHtmlContent] = useState(tempHtmlContent);
    const [html, setHtml] = useState("");
    const [slug, setSlug] = useState("");
    const { username, profileImage } = published_by;
    const [authorImg, setAuthorImg] = useState("");
    const [badgeImg, setBadgeImg] = useState("");
    const [thumbnailsImg, setThumbnailsImg] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [tags, setTags] = useState([]);
    const courseFormInitialState = {
        title: temptitle,
        author: username,
        shortDescription: description,
        youtubeEmbedURL: tempURL,
        date: published_at
    }

    useEffect(() => {
        setSlug(tempSlug);
        setAuthorImg(profileImage);
        setBadgeImg(tempBadge);
        setThumbnailsImg(tempPreview)
        setKeywords(tempKeywords)
        setTags(tempTags)
    }, []);

    const [courseForm, handleInputChange, resetCourseForm] = useForm(courseFormInitialState);
    const {
        title,
        author,
        shortDescription,
        youtubeEmbedURL,
        date
    } = courseForm;

    const createNewEntry = async (e) => {
        // e.preventDefault();
        let { courseId } = router.query;

        try {
            axios.put(`/api/course/${courseId}`,
                {
                    title,
                    slug,
                    shortDescription,
                    published_by: {
                        username: author,
                        profileImage: authorImg
                    },
                    published_at: date,
                    htmlContent,
                    badge: badgeImg,
                    preview: thumbnailsImg,
                    youtubeEmbedURL,
                    tags,
                    keywords
                }
            ).then(({ data }) => {
                if (data.success) {
                    alert("Post updated successfully");
                } else {
                    alert(data.error)
                }
                // resetCourseForm();
                // router.push('/cursos')
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={style.create__course}>

            <h2>Editar curso</h2>
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
                            // labelLeft="https://codechappie.com/blog/"
                            leftlabel="Slug de la entrada"
                            placeholder="nueva-entrada"

                        />
                    </div>

                    <div className={style.one__cols}>
                        <Textarea
                            name='shortDescription'
                            onchange={handleInputChange}
                            value={shortDescription}

                            leftlabel="Descripción corta"
                            placeholder="Coloca una breve descripción..."
                        />
                    </div>
                    <div className={style.two__cols}>
                        <Input
                            value={youtubeEmbedURL}
                            name='youtubeEmbedURL'
                            onchange={handleInputChange}
                            leftContent={<svg xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            }
                            leftlabel="URL embed YouTube"
                            placeholder="https://youtube.com/embed/aW2fsWf1" />

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
                            setter={setBadgeImg}
                            val={badgeImg}
                            leftlabel="Insignia"
                        />
                        <InputImg
                            setter={setThumbnailsImg}
                            val={thumbnailsImg}
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
                    />

                    <button
                        onClick={() => createNewEntry()}
                        className={`${style.button}`} text="Editar entrada">EDITAR</button>
                </div>
            </div>
        </div >
    )
}
export default EditCourse
EditCourse.auth = true;
export async function getServerSideProps({ query, res }) {
    let { courseId } = query;
    try {
        await dbConnect();
        let course = await Course.findOne({
            slug: courseId
        });
        const finalCourse = course.toObject();
        finalCourse._id = `${course._id}`;
        return {
            props: {
                ...finalCourse
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