import Link from 'next/link'
import style from './courses.module.scss'
const CourseNorFoundPage = () => {
    return (
        <div className={style.courses__page}>
            <h1>Curso no encontrado...</h1>
            <p>Si deseas puedes ver otros cursos</p>

            <Link href="/cursos">
                Cursos
            </Link>


        </div>
    )
}

export default CourseNorFoundPage