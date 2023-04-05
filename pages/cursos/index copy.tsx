import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CardCourse from '../../components/card-course/CardCourse'
import style from './courses.module.scss'
const CoursesPage = ({ q }: any) => {
    const router = useRouter();
    const [coursesArr, setCoursesArr] = useState([])
    const [query, setQuery] = useState("")
    const searchInputRef = useRef<any>();

    useEffect(() => {
        if (q) {
            searchInputRef.current.value = q || "";
            setQuery(q);
        }
        axios.get('/api/course', {
            params: {
                q: query
            }
        }).then(({ data }) => {
            setCoursesArr(data.courses)
        })
    }, [query])

    const searchCourses = (e: any) => {
        e.preventDefault();
        setQuery(searchInputRef.current.value);
        router.push(`/cursos?q=${searchInputRef.current.value.trim()}`, undefined);
    }
    return (
        <div className={style.courses__page}>
            <h1>¿Qué es lo que deseas aprender hoy?</h1>
            <form onSubmit={searchCourses}>
                <div className={style.searcher__container}>
                    <div className={style.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            height="30px" viewBox="0 0 24 24"
                            width="30px">
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </div>
                    <input ref={searchInputRef} id="search_input" type="text" placeholder="Buscar cursos..." />
                    <button type='submit'>
                        Buscar
                    </button>
                </div>
            </form>

            <div className={style.cards__container}>
                {
                    coursesArr.map((course: any) => (
                        <CardCourse key={course._id} {...course} />
                    ))
                }
            </div>
        </div>
    )
}
CoursesPage.getInitialProps = async ({ query }: any) => {
    const { q } = query

    return { q }
}

export default CoursesPage