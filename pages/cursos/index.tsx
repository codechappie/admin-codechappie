import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import CardCourse from '../../components/card-course/CardCourse'
import SearchForm from "../../components/search-form/search-form"
import dbConnect from '../../lib/dbConnect'
import Course from '../../models/Course'
import style from './courses.module.scss'

const CoursesPage = ({ courses }: any) => {
    const router = useRouter();
    const searchInputRef = useRef<any>();

    const searchCourses = (e: any) => {
        e.preventDefault();
        router.push(`/cursos?q=${searchInputRef.current.value.trim()}`, undefined);
    }
    return (
        <div className={style.courses__page}>
            <Head>
                <title>CodeChappie - Cursos 🛠️</title>
                <meta name="title" content="CodeChappie - Cursos 🛠️" />
                <meta
                    name="description"
                    content="En este apartado podras encontrar cursos relacionados al mundo de la informática."
                />
            </Head>
            <h1>¿Qué es lo que deseas aprender hoy?</h1>
            <SearchForm
                searchHandler={searchCourses}
                inputPlaceholder="Buscar cursos..."
                buttonSearchText="Buscar"
                searchInputRef={searchInputRef} />

            <div className={style.cards__container}>
                {
                    courses.map((course: any) => (
                        <CardCourse key={course._id} {...course} />
                    ))
                }
            </div>
        </div>
    )
}
export async function getServerSideProps({ query, res }: any) {
    let { q } = query;
    try {
        await dbConnect();
        let courses = await Course.find(q ? {
            $or: [
                {
                    title: {
                        $regex: '.*' + q + '.*',
                        $options: 'i'
                    }
                },
                {
                    tags: {
                        $regex: '.*' + q + '.*',
                        $options: 'i'
                    }
                },
                {
                    keywords: {
                        $regex: '.*' + q + '.*',
                        $options: 'i'
                    }
                },
            ]
        } : {});
        const coursesFiltered = courses.map((doc: any) => {
            const course = doc.toObject();
            course._id = `${doc._id}`;
            return course;
        }).reverse();
        return {
            props: {
                courses: coursesFiltered,
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

export default CoursesPage